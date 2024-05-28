import ProtectedRoute from "@/app/components/ProtectedRoute";
import AppLayout from "@/app/components/ui/AppLayout";

const layout = ({ children }) => {
  return (
    <ProtectedRoute>
      <AppLayout>{children}</AppLayout>
    </ProtectedRoute>
  );
};

export default layout;
