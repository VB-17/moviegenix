import Sidebar from "../components/Sidebar";

export default function Layout({ children }) {
  return (
    <div className="flex font-sans min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-dark-900 overflow-hidden">{children}</main>
    </div>
  );
}
