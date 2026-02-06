import Navbar from './Navbar';
import '../App.css';

type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <Navbar />
      <main className="layout-container">
        {children}
      </main>
    </div>
  );
}

export default Layout;