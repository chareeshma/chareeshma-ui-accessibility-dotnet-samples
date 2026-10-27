import { useId, useRef, useState, type KeyboardEvent } from 'react';

const rows = [
  ['Semantic structure', 'Complete', 'Maya'],
  ['Keyboard support', 'In review', 'Alex'],
  ['Screen reader testing', 'Planned', 'Jordan'],
];

export function AccessibleTable() {
  const instructions = useId();
  const [active, setActive] = useState(0);
  const cells = useRef<(HTMLTableCellElement | null)[]>([]);
  const columns = 3;

  function navigate(event: KeyboardEvent<HTMLTableCellElement>, index: number) {
    const row = Math.floor(index / columns);
    const column = index % columns;
    let next: number;
    switch (event.key) {
      case 'ArrowRight': next = row * columns + Math.min(column + 1, columns - 1); break;
      case 'ArrowLeft': next = row * columns + Math.max(column - 1, 0); break;
      case 'ArrowDown': next = Math.min(row + 1, rows.length - 1) * columns + column; break;
      case 'ArrowUp': next = Math.max(row - 1, 0) * columns + column; break;
      case 'Home': next = event.ctrlKey ? 0 : row * columns; break;
      case 'End': next = event.ctrlKey ? rows.length * columns - 1 : row * columns + columns - 1; break;
      default: return;
    }
    event.preventDefault();
    setActive(next);
    cells.current[next]?.focus();
  }

  return (
    <>
      <p id={instructions}>Tab into the table, then use arrow keys between cells. Home and End move within a row; Ctrl+Home and Ctrl+End jump to the first and last cell. Tab leaves the table. Screen reader users can also use their table navigation commands.</p>
      <div className="table-scroll">
        <table aria-describedby={instructions}>
          <caption>Accessibility review tasks</caption>
          <thead><tr><th scope="col">Task</th><th scope="col">Status</th><th scope="col">Owner</th></tr></thead>
          <tbody>{rows.map((row, rowIndex) => (
            <tr key={row[0]}>{row.map((value, columnIndex) => {
              const index = rowIndex * columns + columnIndex;
              const Cell = columnIndex === 0 ? 'th' : 'td';
              return <Cell key={columnIndex} scope={columnIndex === 0 ? 'row' : undefined}
                ref={element => { cells.current[index] = element; }}
                tabIndex={active === index ? 0 : -1} onFocus={() => setActive(index)}
                onKeyDown={event => navigate(event, index)}>{value}</Cell>;
            })}</tr>
          ))}</tbody>
        </table>
      </div>
    </>
  );
}
