import DashboardFooter from "@/components/Dashboard/DashboardFooter";
import DashboardNavbar, {
  DashboardNavbarProps,
} from "@/components/Dashboard/DashboardNavbar";

interface DashboardLayoutProps extends DashboardNavbarProps {
  children: React.ReactNode;
  className?: string;
}

export default function DashboardLayout({
  children,
  title,
  backButton,
  className,
}: DashboardLayoutProps) {
  return (
    <div
      className={`${className} w-screen max-w-7xl h-screen flex flex-col justify-between`}
    >
      <div className="w-screen">
        <DashboardNavbar title={title} backButton={backButton} />
        <div className="flex flex-col items-center">
          <div className="w-full">{children}</div>
        </div>
      </div>
      <DashboardFooter className="mt-20" />
    </div>
  );
}
