'use client';

import { useId, useState } from 'react';

import type { MockScore } from '@/content/dashboard/types';
import { formatDayMonth } from '@/lib/dates';

/**
 * Mock scores over time, against the agreed target.
 *
 * One series, so there is no legend — the heading names what is plotted — and
 * only the latest point is labelled: a number on every point is noise on a
 * chart whose job is the trend. The target is a reference line, not a second
 * series; drawing it as one would imply two things being compared.
 *
 * The mark colour is `--color-chart`, which exists because the brand golds sit
 * just under the chroma floor and read as grey at 2px. See globals.css.
 *
 * Hover is pointer-only. That is not the accessible path and is not meant to
 * be: the same figures are published as a real table on the Scores page, and
 * the SVG carries a text summary for anyone not using the plot.
 */

const VIEW = { w: 760, h: 260 };
const PAD = { top: 24, right: 56, bottom: 34, left: 46 };

export function ScoreChart({
  scores,
  target,
  /** Compact drops the axis labels for the overview card. */
  compact = false,
}: {
  scores: readonly MockScore[];
  target: number;
  compact?: boolean;
}) {
  const clipId = useId();
  const [hover, setHover] = useState<number | null>(null);

  if (scores.length < 2) {
    return (
      <p className="px-6 py-10 text-[14.5px] leading-[1.6] text-muted">
        Your progress chart appears once you have sat two full-length mocks.
      </p>
    );
  }

  const totals = scores.map((score) => score.total);
  /* Framed to include the target, so "how far is left" is a distance you can
     see rather than one you have to infer from the axis. */
  const lo = Math.max(400, Math.min(...totals, target) - 80);
  const hi = Math.min(1600, Math.max(...totals, target) + 80);

  const plotW = VIEW.w - PAD.left - PAD.right;
  const plotH = VIEW.h - PAD.top - PAD.bottom;

  const x = (index: number) =>
    PAD.left + (scores.length === 1 ? plotW / 2 : (index / (scores.length - 1)) * plotW);
  const y = (value: number) => PAD.top + plotH - ((value - lo) / (hi - lo)) * plotH;

  const line = scores.map((score, index) => `${String(x(index))},${String(y(score.total))}`);
  const area = `${String(PAD.left)},${String(PAD.top + plotH)} ${line.join(' ')} ${String(x(scores.length - 1))},${String(PAD.top + plotH)}`;

  const latest = scores[scores.length - 1]!;
  const active = hover === null ? null : scores[hover];

  /* Four gridlines is enough to read a level against without the grid
     competing with the data. */
  const ticks = [0, 1, 2, 3, 4].map((step) => lo + ((hi - lo) * step) / 4);

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${String(VIEW.w)} ${String(VIEW.h)}`}
        className="w-full"
        role="img"
        aria-label={`Mock scores from ${String(totals[0])} to ${String(latest.total)} across ${String(scores.length)} sittings, against a target of ${String(target)}.`}
        onPointerLeave={() => {
          setHover(null);
        }}
      >
        <defs>
          <clipPath id={clipId}>
            <rect x={PAD.left} y={PAD.top} width={plotW} height={plotH} />
          </clipPath>
        </defs>

        {/* Recessive grid */}
        {ticks.map((value) => (
          <g key={value}>
            <line
              x1={PAD.left}
              x2={PAD.left + plotW}
              y1={y(value)}
              y2={y(value)}
              stroke="rgba(27,36,54,.08)"
              strokeWidth={1}
            />
            {compact ? null : (
              <text
                x={PAD.left - 10}
                y={y(value) + 4}
                textAnchor="end"
                className="fill-warm text-[11px]"
              >
                {Math.round(value)}
              </text>
            )}
          </g>
        ))}

        {/* Target reference line — dashed and neutral so it reads as a rule,
            not as a second series. */}
        <line
          x1={PAD.left}
          x2={PAD.left + plotW}
          y1={y(target)}
          y2={y(target)}
          stroke="#5c6172"
          strokeWidth={1.5}
          strokeDasharray="5 4"
        />
        <text
          x={PAD.left + plotW + 8}
          y={y(target) + 4}
          className="fill-muted-stat text-[11px] font-bold"
        >
          {target}
        </text>

        <g clipPath={`url(#${clipId})`}>
          <polygon points={area} fill="var(--color-chart-soft)" opacity={0.45} />
          <polyline
            points={line.join(' ')}
            fill="none"
            stroke="var(--color-chart)"
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </g>

        {/* Crosshair for the hovered sitting */}
        {active ? (
          <line
            x1={x(hover!)}
            x2={x(hover!)}
            y1={PAD.top}
            y2={PAD.top + plotH}
            stroke="rgba(27,36,54,.25)"
            strokeWidth={1}
          />
        ) : null}

        {scores.map((score, index) => (
          <g key={score.id}>
            {/* 2px surface ring keeps a marker legible where it sits on the line. */}
            <circle
              cx={x(index)}
              cy={y(score.total)}
              r={hover === index ? 6 : 4.5}
              fill="var(--color-chart)"
              stroke="#fbfaf7"
              strokeWidth={2}
            />
            {compact ? null : (
              <text
                x={x(index)}
                y={VIEW.h - 12}
                textAnchor="middle"
                className="fill-warm text-[11px]"
              >
                {score.label}
              </text>
            )}
          </g>
        ))}

        {/* Latest value, direct-labelled — the one number worth reading off. */}
        <text
          x={x(scores.length - 1)}
          y={y(latest.total) - 14}
          textAnchor="middle"
          className="fill-ink-deep text-[13px] font-bold"
        >
          {latest.total}
        </text>

        {/* Hit targets, wider than the marks. */}
        {scores.map((score, index) => (
          <rect
            key={score.id}
            x={x(index) - plotW / (scores.length * 2)}
            y={PAD.top}
            width={plotW / scores.length}
            height={plotH}
            fill="transparent"
            onPointerEnter={() => {
              setHover(index);
            }}
          />
        ))}
      </svg>

      {active ? (
        <div
          role="status"
          className="pointer-events-none absolute top-2 left-1/2 w-max -translate-x-1/2 border border-[rgba(27,36,54,.12)] bg-surface px-4 py-2.5 shadow-[0_18px_36px_-20px_rgba(27,36,54,.5)]"
        >
          <div className="text-[10.5px] font-bold tracking-[.14em] text-gold-deep uppercase">
            {active.label} &middot; {formatDayMonth(active.takenOn)}
          </div>
          <div className="mt-1 font-display text-[20px] text-ink-deep">{active.total}</div>
          <div className="mt-1 flex gap-3 text-[12px] text-muted">
            {active.sections.map((section) => (
              <span key={section.name}>
                {section.name} {section.score}
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
