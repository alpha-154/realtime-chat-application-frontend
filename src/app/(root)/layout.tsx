import ReduxProvider from "@/utils/ReduxProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      {children}
    </ReduxProvider>
  );
}
