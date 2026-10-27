import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AccessibleModal } from './AccessibleModal';
import { AccessibleDropdown } from './AccessibleDropdown';
import { AccessibleForm } from './AccessibleForm';
import { AccessibleTable } from './AccessibleTable';
import '../../styles/layout.scss';

function App() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to main content</a>
      <header className="site-header">
        <div className="container">
          <p className="eyebrow">Accessible UI / React</p>
          <h1>Small components. Inclusive experiences.</h1>
          <p>Semantic HTML, clear feedback, and keyboard-first interactions.</p>
        </div>
      </header>
      <main id="main" className="container" tabIndex={-1}>
        <div className="intro">
          <h2>Explore the patterns</h2>
          <p>Use Tab to move between controls. Each example includes its keyboard instructions.</p>
        </div>
        <div className="sample-grid">
          <section className="card" aria-labelledby="modal-heading">
            <p className="eyebrow">01 / Focus management</p>
            <h2 id="modal-heading">Accessible modal</h2>
            <p>Focus stays inside the open dialog. Escape closes it and returns focus to the opener.</p>
            <AccessibleModal />
          </section>
          <section className="card" aria-labelledby="dropdown-heading">
            <p className="eyebrow">02 / Keyboard navigation</p>
            <h2 id="dropdown-heading">Accessible dropdown</h2>
            <p>Open the menu with Enter, Space, or an arrow key. Navigate with arrows, Home, and End.</p>
            <AccessibleDropdown />
          </section>
          <section className="card" aria-labelledby="form-heading">
            <p className="eyebrow">03 / Validation and feedback</p>
            <h2 id="form-heading">Accessible form</h2>
            <AccessibleForm />
          </section>
          <section className="card" aria-labelledby="table-heading">
            <p className="eyebrow">04 / Structured information</p>
            <h2 id="table-heading">Accessible table</h2>
            <AccessibleTable />
          </section>
        </div>
      </main>
      <footer className="container site-footer">Learning samples targeting WCAG 2.1 AA. Manual assistive-technology testing is still essential.</footer>
    </>
  );
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>);
