import { ReactQueryProvider } from '@/packages/@tanstack/react-query/ReactQueryProvider';
import FeedbackDialogProvider from '@/ui/components/Dialog/FeedbackDialog/FeedbackDialogProvider';
import { Footer } from '@/ui/components/Footer';
import { Layout } from '@/ui/components/Layout';
import JohnsTaskList from '@/ui/pages/JohnsTaskList';

// The value in main calc (40px) should be equal to footerHeightInPixels variable at @ui/components/Footer;

function App() {
  return (
    <ReactQueryProvider>
      <FeedbackDialogProvider>
        <Layout>
          <main className={`h-[calc(100vh-var(--footerHeight))]`}>
            <JohnsTaskList />
          </main>

          <Footer />
        </Layout>
      </FeedbackDialogProvider>
    </ReactQueryProvider>
  );
}

export default App;
