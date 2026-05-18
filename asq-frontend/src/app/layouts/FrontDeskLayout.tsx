export default function FrontDeskLayout() {
  return (
    <div className="min-h-screen bg-[#F0F4FF] flex flex-col">
      <header className="bg-white border-b border-[#D1D9F0] p-4">
        Header 
      </header>

      <main className="flex-1 p-6">
        Main Content
      </main>

      <footer className="bg-white border-t border-[#D1D9F0] p-4">
        Footer
      </footer>
    </div>
  );
}