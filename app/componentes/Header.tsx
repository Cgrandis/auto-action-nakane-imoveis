export default function Header() {
    return (
      <header className="bg-[#FFFFFF] shadow-md">
        <div className="py-3 px-6 flex items-center justify-start">
          <h1
            className="text-2xl font-bold tracking-widest"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              color: '#525259',
              textShadow: '0 0 16px rgba(6, 7, 7, 0.4)',
            }}
          >
            Nakane Auto Autoatendimento
          </h1>
        </div>
        <div
          className="h-[4px] w-full"
          style={{
            background: 'linear-gradient(to right, #6A6A73, #525259, #9C9FA6, #252625',
          }}
        />
      </header>
    );
  }
  