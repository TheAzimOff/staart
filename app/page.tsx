import Statusbar from './components/Statusbar';
import Weather from './components/Weather';

export default function Home() {
  return (
    <main className='pl-12 w-full h-full'>
      <div className='wrapper px-8'>
        <div className='top flex justify-between items-center'>
          <Statusbar />
          <Weather />
        </div>
      </div>
    </main>
  );
}
