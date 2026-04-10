export interface Update {
  id: number;
  updated_at: string;
  content: string;
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const yy = String(d.getFullYear()).slice(2);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yy}.${mm}.${dd}`;
}

function isNew(dateStr: string) {
  return Date.now() - new Date(dateStr).getTime() < 7 * 24 * 60 * 60 * 1000;
}

interface UpdateSectionProps {
  updates: Update[];
}

export function UpdateSection({ updates }: UpdateSectionProps) {
  return (
    <section>
      <div className="mb-4 flex items-baseline justify-between border-b border-[var(--wiki-border-light)] pb-3">
        <span
          className="text-2xl font-semibold text-[var(--wiki-text-primary)]"
          style={{
            fontFamily: "'Outfit', var(--font-pretendard), sans-serif",
            letterSpacing: "-0.3px",
          }}
        >
          최근 업데이트
        </span>
      </div>

      <div className="flex flex-col">
        {updates.map((item) => (
          <div
            key={item.id}
            className="flex items-baseline gap-3 border-b border-[var(--wiki-border-light)] py-3.5 last:border-b-0"
          >
            <span
              className="w-[72px] shrink-0 text-sm text-[var(--wiki-text-muted)]"
            >
              {formatDate(item.updated_at)}
            </span>
            <span className="text-sm text-[var(--wiki-text-secondary)]">
              {item.content}
              {isNew(item.updated_at) && (
                <span
                  className="ml-1.5 inline-block rounded px-[7px] py-[2px] text-sm font-semibold"
                  style={{ background: "#EBF3F9", color: "#4A8DB7" }}
                >
                  NEW
                </span>
              )}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
