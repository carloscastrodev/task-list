import { ReactQueryProvider } from '@/packages/@tanstack/react-query/ReactQueryProvider';
import { Footer, footerHeightInPixels } from '@/ui/components/Footer';
import { Layout } from '@/ui/components/Layout';
import JohnsTaskList from '@/ui/pages/JohnsTaskList';

function App() {
  return (
    <ReactQueryProvider>
      <Layout>
        <main className={`h-[calc(100vh-${footerHeightInPixels}px)]`}>
          <JohnsTaskList />
        </main>

        <Footer />
      </Layout>
    </ReactQueryProvider>
  );
}

export default App;
