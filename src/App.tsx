import { useState, useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Home,
  Factory,
  FileText,
  Database,
  Settings,
  Plus,
  Edit,
  Trash2,
  TrendingUp,
  Target,
  CheckCircle,
  AlertCircle,
  Printer,
  Eye,
  ExternalLink,
  Copy,
  Loader2,
  Bell,
  X,
} from "lucide-react";

const WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbwURvYXyBD0-SrqomO4eNbE16-KtdD1g6e8G0LLIZA0_nb_jkz9FHDp_SPA1r57vkVE/exec";

// Login Page Component
const LoginPage = ({
  onLogin,
  username,
  setUsername,
  password,
  setPassword,
  error,
  setError,
}: {
  onLogin: (e: React.FormEvent) => void;
  username: string;
  setUsername: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  error: string;
  setError: (v: string) => void;
}) => {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Animation */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#52B788] relative overflow-hidden">
        <div className="absolute inset-0">
          {/* Animated circles */}
          <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full animate-pulse"></div>
          <div
            className="absolute bottom-32 right-20 w-96 h-96 bg-white/10 rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/3 w-48 h-48 bg-white/10 rounded-full animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>

          {/* Floating factory icon */}
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2">
            <div className="animate-bounce">
              <Factory className="w-32 h-32 text-white/80" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-white">
          <h1 className="text-5xl font-bold mb-4 animate-fade-in">
            Reguler System
          </h1>
          <p
            className="text-xl text-white/90 animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            Sistem Manajemen Produksi & Data
          </p>
          <div className="mt-8 flex gap-4">
            <div
              className="flex items-center gap-2 animate-fade-in"
              style={{ animationDelay: "0.6s" }}
            >
              <CheckCircle className="w-6 h-6" />
              <span>Real-time Monitoring</span>
            </div>
            <div
              className="flex items-center gap-2 animate-fade-in"
              style={{ animationDelay: "0.9s" }}
            >
              <TrendingUp className="w-6 h-6" />
              <span>Analytics Dashboard</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#2D6A4F] to-[#52B788] rounded-full mb-4">
                <Factory className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-[#1B4332] mb-2">
                Welcome Back
              </h2>
              <p className="text-gray-600">Silakan login untuk melanjutkan</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={onLogin} className="space-y-6">
              <div>
                <Label
                  htmlFor="username"
                  className="text-gray-700 font-semibold"
                >
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setError("");
                  }}
                  placeholder="Masukkan username"
                  className="mt-2 h-12 border-gray-300 focus:border-[#2D6A4F] focus:ring-[#2D6A4F]"
                  required
                  autoFocus
                />
              </div>

              <div>
                <Label
                  htmlFor="password"
                  className="text-gray-700 font-semibold"
                >
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Masukkan password"
                  className="mt-2 h-12 border-gray-300 focus:border-[#2D6A4F] focus:ring-[#2D6A4F]"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-[#2D6A4F] to-[#52B788] hover:from-[#1B4332] hover:to-[#2D6A4F] text-white font-semibold text-lg shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Login
              </Button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center text-sm text-gray-500">
              <p>� 2025 Reguler System. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Pagination Component
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      for (let i = 1; i <= 4; i++) pages.push(i);
      pages.push("...");
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1);
      pages.push("...");
      for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      pages.push("...");
      pages.push(currentPage - 1);
      pages.push(currentPage);
      pages.push(currentPage + 1);
      pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-6 mb-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="h-9 px-4 border-[#2D6A4F] text-[#1B4332] hover:bg-[#2D6A4F] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed font-medium"
      >
        Previous
      </Button>
      <div className="flex gap-1">
        {getPageNumbers().map((page, idx) =>
          page === "..." ? (
            <span
              key={`ellipsis-${idx}`}
              className="h-9 px-3 flex items-center text-[#1B4332]"
            >
              ...
            </span>
          ) : (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(page as number)}
              className={
                currentPage === page
                  ? "h-9 w-9 p-0 bg-[#FFD700] text-[#1B4332] hover:bg-[#F4B942] font-semibold shadow-sm"
                  : "h-9 w-9 p-0 border-[#2D6A4F] text-[#1B4332] hover:bg-[#2D6A4F]/10 hover:text-[#1B4332] font-medium"
              }
            >
              {page}
            </Button>
          )
        )}
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="h-9 px-4 border-[#2D6A4F] text-[#1B4332] hover:bg-[#2D6A4F] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed font-medium"
      >
        Next
      </Button>
    </div>
  );
};

interface ProduksiNPK {
  id?: string;
  tanggal: string;
  shiftMalamOnspek: number;
  shiftMalamOffspek: number;
  shiftPagiOnspek: number;
  shiftPagiOffspek: number;
  shiftSoreOnspek: number;
  shiftSoreOffspek: number;
  totalOnspek?: number;
  totalOffspek?: number;
  total?: number;
}

interface ProduksiBlending {
  id?: string;
  tanggal: string;
  kategori: string;
  formula: string;
  tonase: number;
}

interface ProduksiNPKMini {
  id?: string;
  tanggal: string;
  formulasi: string;
  tonase: number;
}

interface TimesheetForklift {
  id?: string;
  tanggal: string;
  forklift: string;
  deskripsiTemuan: string;
  jamOff: string;
  jamStart: string;
  jamGrounded?: number;
  jamOperasi?: number;
  keterangan?: string;
}

interface TimesheetLoader {
  id?: string;
  tanggal: string;
  shift: string;
  deskripsiTemuan: string;
  jamOff: string;
  jamStart: string;
  jamGrounded?: number;
  jamOperasi?: number;
  keterangan?: string;
}

interface Downtime {
  id?: string;
  tanggal: string;
  item: string;
  deskripsi: string;
  jamOff: string;
  jamStart: string;
  downtime?: number;
}

interface WorkRequest {
  id?: string;
  tanggal: string;
  nomorWR: string;
  item: string;
  area: string;
  eksekutor: string;
  include: string;
  deskripsiPekerjaan: string;
}

interface BahanBaku {
  id?: string;
  tanggal: string;
  jenisBahanBaku: string;
  tonase: number;
  keterangan: string;
}

interface Vibrasi {
  id?: string;
  tanggal: string;
  equipment: string;
  position: string;
  point: string;
  nilai: number;
  keterangan: string;
}

interface GatePass {
  id?: string;
  noFile: string;
  noPol: string;
  pemilikBarang: string;
  namaPembawa: string;
  namaBarang: string;
  alasanMengeluarkan: string;
  tanggal: string;
  approver: string;
}

interface Akun {
  id?: string;
  noBadge: string;
  nama: string;
  jabatan: string;
  passwordESS: string;
  passwordPismart: string;
  passwordDOF: string;
  tanggalUpdate: string;
}

interface RKAP {
  id?: string;
  bulan: string;
  targetRKAP: number;
}

// Google Sheets API URL - Replace with your deployed script URL
const API_URL =
  "https://script.google.com/macros/s/AKfycbwURvYXyBD0-SrqomO4eNbE16-KtdD1g6e8G0LLIZA0_nb_jkz9FHDp_SPA1r57vkVE/exec";

// Session API helpers
async function checkSessionAPI(
  username: string
): Promise<{ hasSession: boolean; sessionData?: any }> {
  try {
    console.log("[SESSION] Checking session for:", username);
    const response = await fetch(
      `${API_URL}?action=checkSession&username=${encodeURIComponent(username)}`
    );
    const data = await response.json();
    console.log("[SESSION] Check result:", data);
    return data;
  } catch (error) {
    console.error("[SESSION] Error checking session:", error);
    return { hasSession: false };
  }
}

async function createSessionAPI(
  username: string,
  sessionId: string
): Promise<boolean> {
  try {
    console.log("[SESSION] Creating session:", { username, sessionId });
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({
        action: "createSession",
        username,
        sessionId,
      }),
    });

    // Check if response is ok
    if (!response.ok) {
      console.error("[SESSION] Response not OK:", response.status);
      return false;
    }

    const data = await response.json();
    console.log("[SESSION] Create result:", data);
    return data.success;
  } catch (error) {
    console.error("[SESSION] Error creating session:", error);
    return false;
  }
}

async function updateSessionAPI(
  username: string,
  sessionId: string
): Promise<boolean> {
  try {
    console.log("[SESSION] Updating session:", { username, sessionId });
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({
        action: "updateSession",
        username,
        sessionId,
      }),
    });

    if (!response.ok) {
      console.error("[SESSION] Update response not OK:", response.status);
      return false;
    }

    const data = await response.json();
    console.log("[SESSION] Update result:", data);
    return data.success;
  } catch (error) {
    console.error("[SESSION] Error updating session:", error);
    return false;
  }
}

async function deleteSessionAPI(username: string): Promise<boolean> {
  try {
    console.log("[SESSION] Deleting session:", username);
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({
        action: "deleteSession",
        username,
      }),
    });

    if (!response.ok) {
      console.error("[SESSION] Delete response not OK:", response.status);
      return false;
    }

    const data = await response.json();
    console.log("[SESSION] Delete result:", data);
    return data.success;
  } catch (error) {
    console.error("[SESSION] Error deleting session:", error);
    return false;
  }
}

export default function ProduksiNPKApp() {
  const [activeNav, setActiveNav] = useState("home");
  const [activeTab, setActiveTab] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [printDateRange, setPrintDateRange] = useState({
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
  });
  const [printSupervisorName, setPrintSupervisorName] = useState("");
  const [printSupervisorBadge, setPrintSupervisorBadge] = useState("");
  const [printBlendingDateRange, setPrintBlendingDateRange] = useState({
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
  });
  const [printBlendingSectionHeadName, setPrintBlendingSectionHeadName] =
    useState("");
  const [printBlendingSectionHeadBadge, setPrintBlendingSectionHeadBadge] =
    useState("");
  const [printMiniDateRange, setPrintMiniDateRange] = useState({
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
  });
  const [printForkliftMonth, setPrintForkliftMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );
  const [printForkliftUnit, setPrintForkliftUnit] = useState("F19");
  const [printLoaderMonth, setPrintLoaderMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  // Downtime chart filter
  const [downtimeChartMonth, setDowntimeChartMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  // Login states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<"admin" | "user" | "supervisor">(
    "admin"
  );
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showAccountInUseWarning, setShowAccountInUseWarning] = useState(false);
  const [accountInUseMessage, setAccountInUseMessage] = useState("");

  // Notification states
  interface Notification {
    id: string;
    message: string;
    timestamp: Date;
    read: boolean;
    type: string;
  }
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Copy success animation states
  const [copySuccess, setCopySuccess] = useState<{
    [key: string]: boolean;
  }>({});

  // Loading and success overlay states
  const [showLoadingOverlay, setShowLoadingOverlay] = useState(false);
  const [showSuccessOverlay, setShowSuccessOverlay] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showLogoutOverlay, setShowLogoutOverlay] = useState(false);
  const [showLoginOverlay, setShowLoginOverlay] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState<{ [key: string]: number }>({
    produksi_npk: 1,
    produksi_blending: 1,
    produksi_npk_mini: 1,
    timesheet_forklift: 1,
    timesheet_loader: 1,
    downtime: 1,
    work_request: 1,
    bahan_baku: 1,
    vibrasi: 1,
    gate_pass: 1,
    akun: 1,
    rkap: 1,
  });
  const itemsPerPage = 15;

  // Data states
  const [produksiNPKData, setProduksiNPKData] = useState<ProduksiNPK[]>([]);
  const [produksiBlendingData, setProduksiBlendingData] = useState<
    ProduksiBlending[]
  >([]);
  const [produksiNPKMiniData, setProduksiNPKMiniData] = useState<
    ProduksiNPKMini[]
  >([]);
  const [timesheetForkliftData, setTimesheetForkliftData] = useState<
    TimesheetForklift[]
  >([]);
  const [timesheetLoaderData, setTimesheetLoaderData] = useState<
    TimesheetLoader[]
  >([]);
  const [downtimeData, setDowntimeData] = useState<Downtime[]>([]);
  const [workRequestData, setWorkRequestData] = useState<WorkRequest[]>([]);
  const [bahanBakuData, setBahanBakuData] = useState<BahanBaku[]>([]);
  const [vibrasiData, setVibrasiData] = useState<Vibrasi[]>([]);
  const [gatePassData, setGatePassData] = useState<GatePass[]>([]);
  const [akunData, setAkunData] = useState<Akun[]>([]);
  const [rkapData, setRkapData] = useState<RKAP[]>([]);

  // Form states for Produksi NPK
  const [formProduksiNPK, setFormProduksiNPK] = useState<ProduksiNPK>({
    tanggal: new Date().toISOString().split("T")[0],
    shiftMalamOnspek: 0,
    shiftMalamOffspek: 0,
    shiftPagiOnspek: 0,
    shiftPagiOffspek: 0,
    shiftSoreOnspek: 0,
    shiftSoreOffspek: 0,
  });

  const [formProduksiBlending, setFormProduksiBlending] =
    useState<ProduksiBlending>({
      tanggal: new Date().toISOString().split("T")[0],
      kategori: "Fresh",
      formula: "",
      tonase: 0,
    });

  const [formProduksiNPKMini, setFormProduksiNPKMini] =
    useState<ProduksiNPKMini>({
      tanggal: new Date().toISOString().split("T")[0],
      formulasi: "",
      tonase: 0,
    });

  const [formTimesheetForklift, setFormTimesheetForklift] =
    useState<TimesheetForklift>({
      tanggal: new Date().toISOString().split("T")[0],
      forklift: "F19",
      deskripsiTemuan: "",
      jamOff: "",
      jamStart: "",
    });

  const [formTimesheetLoader, setFormTimesheetLoader] =
    useState<TimesheetLoader>({
      tanggal: new Date().toISOString().split("T")[0],
      shift: "Malam",
      deskripsiTemuan: "",
      jamOff: "",
      jamStart: "",
    });

  const [formDowntime, setFormDowntime] = useState<Downtime>({
    tanggal: new Date().toISOString().split("T")[0],
    item: "",
    deskripsi: "",
    jamOff: "",
    jamStart: "",
  });

  const [formWorkRequest, setFormWorkRequest] = useState<WorkRequest>({
    tanggal: new Date().toISOString().split("T")[0],
    nomorWR: "",
    item: "",
    area: "",
    eksekutor: "",
    include: "",
    deskripsiPekerjaan: "",
  });

  const [formBahanBaku, setFormBahanBaku] = useState<BahanBaku>({
    tanggal: new Date().toISOString().split("T")[0],
    jenisBahanBaku: "Urea",
    tonase: 0,
    keterangan: "",
  });

  const [formVibrasi, setFormVibrasi] = useState<Vibrasi>({
    tanggal: new Date().toISOString().split("T")[0],
    equipment: "",
    position: "Horizontal",
    point: "A",
    nilai: 0,
    keterangan: "",
  });

  const [formGatePass, setFormGatePass] = useState<GatePass>({
    noFile: "",
    noPol: "",
    pemilikBarang: "",
    namaPembawa: "",
    namaBarang: "",
    alasanMengeluarkan: "",
    tanggal: new Date().toISOString().split("T")[0],
    approver: "",
  });

  const [formAkun, setFormAkun] = useState<Akun>({
    noBadge: "",
    nama: "",
    jabatan: "",
    passwordESS: "",
    passwordPismart: "",
    passwordDOF: "",
    tanggalUpdate: new Date().toISOString().split("T")[0],
  });

  const [formRKAP, setFormRKAP] = useState<RKAP>({
    bulan: "Januari",
    targetRKAP: 0,
  });

  const [viewAkunModal, setViewAkunModal] = useState<{
    show: boolean;
    data: Akun | null;
  }>({ show: false, data: null });
  const [passwordModal, setPasswordModal] = useState<{
    show: boolean;
    pendingAkun: Akun | null;
  }>({ show: false, pendingAkun: null });
  const [passwordInput, setPasswordInput] = useState("");

  // Check login status from localStorage on mount
  useEffect(() => {
    const savedLoginStatus = localStorage.getItem("isLoggedIn");
    const savedUserRole = localStorage.getItem("userRole") as "admin" | "user";
    if (savedLoginStatus === "true") {
      setIsLoggedIn(true);
      setUserRole(savedUserRole || "admin");
    }

    // Load notifications from localStorage
    const savedNotifications = localStorage.getItem("notifications");
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications));
    }
  }, []);

  // Helper function to add notification (only for user role)
  const addNotification = (type: string, message: string) => {
    if (userRole === "user") {
      const newNotif: Notification = {
        id: Date.now().toString(),
        message: `User menambahkan data: ${message}`,
        timestamp: new Date(),
        read: false,
        type,
      };
      const updatedNotifs = [...notifications, newNotif];
      setNotifications(updatedNotifs);
      localStorage.setItem("notifications", JSON.stringify(updatedNotifs));
    }
  };

  // Close notification dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (showNotifications && !target.closest(".notification-dropdown")) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotifications]);

  // Helper to check if user has edit/delete permission
  const canEditDelete = () => {
    return userRole === "admin" || userRole === "supervisor";
  };

  // Generate unique session ID for current browser
  const currentSessionId = useRef(
    Math.random().toString(36).substr(2, 9) + Date.now()
  );

  // Check if account is already in use (Google Sheets-based)
  const checkAccountInUse = async (username: string): Promise<boolean> => {
    try {
      console.log("[CHECK] Current session ID:", currentSessionId.current);
      const result = await checkSessionAPI(username);
      console.log("[CHECK] API result:", result);

      if (result.hasSession) {
        console.log("[CHECK] Found active session:", result.sessionData);
        console.log("[CHECK] Comparing:", {
          existing: result.sessionData.sessionId,
          current: currentSessionId.current,
          different: result.sessionData.sessionId !== currentSessionId.current,
        });

        // Check if it's a different session (different browser/device)
        if (result.sessionData.sessionId !== currentSessionId.current) {
          console.log(
            "[CHECK] ⛔ BLOCKING LOGIN - Different session detected!"
          );
          return true; // Block login - account in use elsewhere
        } else {
          console.log("[CHECK] ✅ Same session - allowing login");
        }
      } else {
        console.log("[CHECK] ✅ No active session found - allowing login");
      }

      return false; // Account free to use
    } catch (error) {
      console.error("[CHECK] Error checking account use:", error);
      return false; // Allow login on error
    }
  };

  // Set account session (Google Sheets-based)
  const setAccountSession = async (username: string): Promise<boolean> => {
    try {
      const success = await createSessionAPI(
        username,
        currentSessionId.current
      );
      return success;
    } catch (error) {
      console.error("Error setting session:", error);
      return false;
    }
  };

  // Update session keep-alive (Google Sheets-based)
  const updateAccountSession = async (username: string): Promise<boolean> => {
    try {
      const success = await updateSessionAPI(
        username,
        currentSessionId.current
      );
      return success;
    } catch (error) {
      console.error("Error updating session:", error);
      return false;
    }
  };

  // Keep session alive by updating timestamp (Google Sheets-based)
  useEffect(() => {
    if (!isLoggedIn) return;

    const username = localStorage.getItem("username");
    if (!username) return;

    // Update session timestamp every 30 seconds to keep session active
    const keepAliveInterval = setInterval(() => {
      updateAccountSession(username);
    }, 30000);

    return () => {
      clearInterval(keepAliveInterval);
    };
  }, [isLoggedIn]);

  // Handle Login (Google Sheets session check)
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate credentials
    let validCredentials = false;
    let role: "admin" | "user" | "supervisor" = "admin";
    let username = "";

    if (loginUsername === "admin" && loginPassword === "adminreguler") {
      validCredentials = true;
      role = "admin";
      username = "admin";
    } else if (loginUsername === "user" && loginPassword === "usernpk") {
      validCredentials = true;
      role = "user";
      username = "user";
    } else if (loginUsername === "supervisor" && loginPassword === "3972103") {
      validCredentials = true;
      role = "supervisor";
      username = "supervisor";
    }

    if (!validCredentials) {
      setLoginError("Username atau password salah!");
      return;
    }

    // Check if account is already in use (cross-browser detection via Google Sheets)
    const accountInUse = await checkAccountInUse(username);
    console.log("[LOGIN] Account in use check result:", accountInUse);

    if (accountInUse) {
      console.log("[LOGIN] 🚨 Showing warning modal - account in use!");
      const warningMsg = `Akun "${username}" sedang aktif di perangkat/browser lain. Untuk keamanan, hanya satu sesi yang diperbolehkan per akun. Silakan logout dari perangkat lain atau tunggu 2 menit.`;

      setAccountInUseMessage(warningMsg);
      setShowAccountInUseWarning(true);

      console.log("[LOGIN] Modal state set to true");

      // Auto close warning after 5 seconds WITHOUT logging in
      setTimeout(() => {
        console.log("[LOGIN] Auto-closing warning modal");
        setShowAccountInUseWarning(false);
        setLoginUsername("");
        setLoginPassword("");
      }, 5000);
      return; // Block login attempt
    }

    console.log("[LOGIN] ✅ Account free - proceeding with login");

    // Proceed with login if account is free
    await proceedWithLogin(username, role);
  };

  // Proceed with login after checks (Google Sheets session creation)
  const proceedWithLogin = async (
    username: string,
    role: "admin" | "user" | "supervisor"
  ) => {
    // Show login overlay animation
    setShowLoginOverlay(true);

    // Create session in Google Sheets
    await setAccountSession(username);

    // Wait for animation
    setTimeout(() => {
      setIsLoggedIn(true);
      setUserRole(role);
      setLoginError("");
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", username);
      localStorage.setItem("userRole", role);
      setShowLoginOverlay(false);
    }, 1500);
  };

  // Handle Logout (Google Sheets session deletion)
  const handleLogout = () => {
    setShowLogoutOverlay(true);
    setTimeout(async () => {
      const username = localStorage.getItem("username");
      if (username) {
        // Delete session from Google Sheets
        await deleteSessionAPI(username);
      }
      setIsLoggedIn(false);
      setUserRole("admin");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("username");
      localStorage.removeItem("userRole");
      setActiveNav("home");
      setActiveTab("");
      setShowLogoutOverlay(false);
    }, 1500);
  };

  // Show success overlay helper
  const showSuccess = (message: string) => {
    setShowLoadingOverlay(false);
    setSuccessMessage(message);
    setShowSuccessOverlay(true);
    setTimeout(() => {
      setShowSuccessOverlay(false);
      setSuccessMessage("");
    }, 2000);
  };

  // Calculate totals for Produksi NPK
  useEffect(() => {
    const totalOnspek =
      formProduksiNPK.shiftMalamOnspek +
      formProduksiNPK.shiftPagiOnspek +
      formProduksiNPK.shiftSoreOnspek;
    const totalOffspek =
      formProduksiNPK.shiftMalamOffspek +
      formProduksiNPK.shiftPagiOffspek +
      formProduksiNPK.shiftSoreOffspek;
    setFormProduksiNPK((prev) => ({
      ...prev,
      totalOnspek,
      totalOffspek,
      total: totalOnspek + totalOffspek,
    }));
  }, [
    formProduksiNPK.shiftMalamOnspek,
    formProduksiNPK.shiftMalamOffspek,
    formProduksiNPK.shiftPagiOnspek,
    formProduksiNPK.shiftPagiOffspek,
    formProduksiNPK.shiftSoreOnspek,
    formProduksiNPK.shiftSoreOffspek,
  ]);

  // Calculate for Timesheet Forklift
  useEffect(() => {
    if (formTimesheetForklift.jamOff && formTimesheetForklift.jamStart) {
      const off = parseFloat(formTimesheetForklift.jamOff);
      const start = parseFloat(formTimesheetForklift.jamStart);
      const grounded = start - off;
      const operasi = 20 - grounded;
      const keterangan = grounded < 3 ? "OK" : "Grounded";
      setFormTimesheetForklift((prev) => ({
        ...prev,
        jamGrounded: grounded,
        jamOperasi: operasi,
        keterangan,
      }));
    }
  }, [formTimesheetForklift.jamOff, formTimesheetForklift.jamStart]);

  // Calculate for Timesheet Loader
  useEffect(() => {
    if (formTimesheetLoader.jamOff && formTimesheetLoader.jamStart) {
      const off = parseFloat(formTimesheetLoader.jamOff);
      const start = parseFloat(formTimesheetLoader.jamStart);
      const grounded = start - off;
      let operasi = 0;
      if (formTimesheetLoader.shift === "Malam") operasi = 8 - grounded;
      else if (formTimesheetLoader.shift === "Pagi") operasi = 7 - grounded;
      else if (formTimesheetLoader.shift === "Sore") operasi = 7 - grounded;
      const keterangan = grounded < 3 ? "OK" : "Grounded";
      setFormTimesheetLoader((prev) => ({
        ...prev,
        jamGrounded: grounded,
        jamOperasi: operasi,
        keterangan,
      }));
    }
  }, [
    formTimesheetLoader.jamOff,
    formTimesheetLoader.jamStart,
    formTimesheetLoader.shift,
  ]);

  // Calculate downtime (jam) from HH:MM inputs
  useEffect(() => {
    if (formDowntime.jamOff && formDowntime.jamStart) {
      const parseToMinutes = (value: string) => {
        const [hh, mm] = value.split(":");
        const hours = Number(hh) || 0;
        const minutes = Number(mm) || 0;
        return hours * 60 + minutes;
      };

      const offMinutes = parseToMinutes(formDowntime.jamOff);
      const startMinutes = parseToMinutes(formDowntime.jamStart);
      const diffMinutes = startMinutes - offMinutes;

      setFormDowntime((prev) => ({
        ...prev,
        downtime: diffMinutes > 0 ? diffMinutes / 60 : 0,
      }));
    }
  }, [formDowntime.jamOff, formDowntime.jamStart]);

  // Generate Gate Pass number
  const generateGatePassNumber = () => {
    const now = new Date();
    const monthRoman = [
      "I",
      "II",
      "III",
      "IV",
      "V",
      "VI",
      "VII",
      "VIII",
      "IX",
      "X",
      "XI",
      "XII",
    ][now.getMonth()];
    const year = now.getFullYear();
    const count = gatePassData.length + 1;
    const noFile = `${String(count).padStart(
      3,
      "0"
    )}/GATE/NPKG2/${monthRoman}/${year}`;
    setFormGatePass((prev) => ({ ...prev, noFile }));
  };

  useEffect(() => {
    if (activeTab === "gatepass" && !formGatePass.noFile) {
      generateGatePassNumber();
    }
  }, [activeTab, gatePassData.length]);

  // Helper function: Normalize date to YYYY-MM-DD format
  const normalizeDateForInput = (date: string | Date | any): string => {
    if (!date) {
      // Jangan fallback ke hari ini di sini untuk edit; biarkan kosong
      return "";
    }

    try {
      console.log(
        "?? normalizeDateForInput input:",
        date,
        "Type:",
        typeof date
      );

      // Jika sudah string format YYYY-MM-DD, return as is
      if (typeof date === "string" && date.match(/^\d{4}-\d{2}-\d{2}$/)) {
        console.log("? Already YYYY-MM-DD format:", date);
        return date;
      }

      // Jika string format DD/MM/YYYY (dari Google Sheets display)
      if (typeof date === "string" && date.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/)) {
        const parts = date.split("/");
        const day = parts[0].padStart(2, "0");
        const month = parts[1].padStart(2, "0");
        const year = parts[2];
        const result = `${year}-${month}-${day}`;
        console.log("? Converted DD/MM/YYYY to:", result);
        return result;
      }

      // Jika Date object - JANGAN gunakan Date object karena timezone issue!
      // Backend seharusnya sudah mengirim string YYYY-MM-DD
      if (date instanceof Date && !isNaN(date.getTime())) {
        console.warn(
          "?? Received Date object instead of string! This may cause timezone issues."
        );
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const result = `${year}-${month}-${day}`;
        console.log("? Converted Date object to:", result);
        return result;
      }

      // Jika string yang bisa di-parse sebagai tanggal
      if (typeof date === "string") {
        // Coba parse sebagai string ISO atau lainnya
        const dateObj = new Date(date);
        if (!isNaN(dateObj.getTime())) {
          const year = dateObj.getFullYear();
          const month = String(dateObj.getMonth() + 1).padStart(2, "0");
          const day = String(dateObj.getDate()).padStart(2, "0");
          const result = `${year}-${month}-${day}`;
          console.log("? Converted parseable string to:", result);
          return result;
        }
      }

      console.error("? Failed to normalize date:", date);
      // Jangan paksa fallback ke hari ini; biarkan kosong supaya tidak misleading
      return "";
    } catch (error) {
      console.error("? Error normalizing date:", error);
      return "";
    }
  };

  // Fetch data from Google Sheets
  const fetchData = async (sheetName: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${WEBHOOK_URL}?action=read&sheet=${sheetName}`,
        {
          method: "GET",
          redirect: "follow",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Save data to Google Sheets
  const saveData = async (sheetName: string, data: any) => {
    try {
      setLoading(true);

      const payload = {
        action: "create",
        sheet: sheetName,
        data: data,
      };

      console.log("Sending data:", payload);

      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        redirect: "follow",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Result:", result);
      return result;
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Gagal menyimpan data: " + error);
    } finally {
      setLoading(false);
    }
  };

  // Update data in Google Sheets
  const updateData = async (sheetName: string, data: any) => {
    try {
      setLoading(true);

      const payload = {
        action: "update",
        sheet: sheetName,
        data: data,
      };

      console.log("Updating data:", payload);

      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        redirect: "follow",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Result:", result);
      return result;
    } catch (error) {
      console.error("Error updating data:", error);
      alert("Gagal mengupdate data: " + error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Delete data from Google Sheets
  const deleteDataFromSheet = async (sheetName: string, data: any) => {
    try {
      setLoading(true);

      const payload = {
        action: "delete",
        sheet: sheetName,
        data: data,
      };

      console.log("Deleting data:", payload);

      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        redirect: "follow",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Result:", result);
      return result;
    } catch (error) {
      console.error("Error deleting data:", error);
      alert("Gagal menghapus data: " + error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Load all data on mount
  useEffect(() => {
    const loadAllData = async () => {
      const [
        npk,
        blending,
        mini,
        forklift,
        loader,
        downtime,
        wr,
        bahan,
        vibrasi,
        gate,
        akun,
        rkap,
      ] = await Promise.all([
        fetchData("produksi_npk"),
        fetchData("produksi_blending"),
        fetchData("produksi_npk_mini"),
        fetchData("timesheet_forklift"),
        fetchData("timesheet_loader"),
        fetchData("downtime"),
        fetchData("work_request"),
        fetchData("bahan_baku"),
        fetchData("vibrasi"),
        fetchData("gate_pass"),
        fetchData("akun"),
        fetchData("rkap"),
      ]);

      setProduksiNPKData(npk || []);
      setProduksiBlendingData(blending || []);
      setProduksiNPKMiniData(mini || []);
      setTimesheetForkliftData(forklift || []);
      setTimesheetLoaderData(loader || []);

      // Normalisasi jam downtime (jamOff & jamStart) ke format HH:MM
      const normalizedDowntime = (downtime || []).map((item: any) => {
        const formatTime = (value: any) => {
          if (value == null || value === "") return "";

          // Jika string, cek dulu apakah HH:MM (JANGAN parse sebagai Date!)
          if (typeof value === "string") {
            // Hapus apostrof prefix kalau ada (dari Apps Script)
            const cleaned = value.startsWith("'") ? value.substring(1) : value;

            // Cek apakah string berformat HH:MM
            const m = cleaned.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/);
            if (m) {
              const h = String(Number(m[1])).padStart(2, "0");
              const mm = m[2];
              return `${h}:${mm}`;
            }

            // Kembalikan string asli kalau sudah format jam
            return cleaned;
          }

          // Jika Date object, ambil jam & menit lokal
          if (value instanceof Date) {
            const hours = String(value.getHours()).padStart(2, "0");
            const minutes = String(value.getMinutes()).padStart(2, "0");
            return `${hours}:${minutes}`;
          }

          // Jika number (misal serial Excel) coba konversi via Date origin
          if (typeof value === "number") {
            const excelEpoch = new Date(1899, 11, 30);
            const ms = value * 24 * 60 * 60 * 1000;
            const d = new Date(excelEpoch.getTime() + ms);
            const hours = String(d.getHours()).padStart(2, "0");
            const minutes = String(d.getMinutes()).padStart(2, "0");
            return `${hours}:${minutes}`;
          }

          // Fallback: kembalikan string asli
          return String(value);
        };

        return {
          ...item,
          jamOff: formatTime(item.jamOff),
          jamStart: formatTime(item.jamStart),
        } as Downtime;
      });

      setDowntimeData(normalizedDowntime);

      // Normalisasi tanggal work_request untuk menghindari masalah format
      const normalizedWR = (wr || []).map((item: any) => {
        let tanggal = item.tanggal;

        // Jika Date object, konversi ke YYYY-MM-DD dengan local time
        if (tanggal instanceof Date) {
          const year = tanggal.getFullYear();
          const month = String(tanggal.getMonth() + 1).padStart(2, "0");
          const day = String(tanggal.getDate()).padStart(2, "0");
          tanggal = `${year}-${month}-${day}`;
        }
        // Jika string tapi bukan format YYYY-MM-DD, normalize
        else if (
          typeof tanggal === "string" &&
          !tanggal.match(/^\d{4}-\d{2}-\d{2}$/)
        ) {
          tanggal = normalizeDateForInput(tanggal);
        }

        return { ...item, tanggal };
      });
      setWorkRequestData(normalizedWR);

      setBahanBakuData(bahan || []);
      setVibrasiData(vibrasi || []);
      setGatePassData(gate || []);
      setAkunData(akun || []);
      setRkapData(rkap || []);
    };

    loadAllData();
  }, []);

  // Handle form submissions
  const handleSubmitProduksiNPK = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowLoadingOverlay(true);
    try {
      if (editingIndex !== null) {
        const updatedData = [...produksiNPKData];
        updatedData[editingIndex] = formProduksiNPK;
        setProduksiNPKData(updatedData);
        await updateData("produksi_npk", formProduksiNPK);
        showSuccess("Data berhasil diupdate!");
      } else {
        await saveData("produksi_npk", formProduksiNPK);
        setProduksiNPKData([...produksiNPKData, formProduksiNPK]);
        addNotification(
          "produksi_npk",
          `Produksi NPK tanggal ${new Date(
            formProduksiNPK.tanggal
          ).toLocaleDateString("id-ID")}`
        );
        showSuccess("Data berhasil disimpan!");
      }
      setFormProduksiNPK({
        tanggal: new Date().toISOString().split("T")[0],
        shiftMalamOnspek: 0,
        shiftMalamOffspek: 0,
        shiftPagiOnspek: 0,
        shiftPagiOffspek: 0,
        shiftSoreOnspek: 0,
        shiftSoreOffspek: 0,
      });
      setShowForm(false);
      setEditingIndex(null);
    } catch (error) {
      setShowLoadingOverlay(false);
      alert("Terjadi kesalahan saat menyimpan data");
    }
  };

  const handleSubmitProduksiBlending = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowLoadingOverlay(true);
    try {
      if (editingIndex !== null) {
        const updatedData = [...produksiBlendingData];
        updatedData[editingIndex] = formProduksiBlending;
        setProduksiBlendingData(updatedData);
        await updateData("produksi_blending", formProduksiBlending);
        showSuccess("Data berhasil diupdate!");
      } else {
        await saveData("produksi_blending", formProduksiBlending);
        setProduksiBlendingData([
          ...produksiBlendingData,
          formProduksiBlending,
        ]);
        addNotification(
          "produksi_blending",
          `Produksi Blending (${
            formProduksiBlending.formula
          }) tanggal ${new Date(
            formProduksiBlending.tanggal
          ).toLocaleDateString("id-ID")}`
        );
        showSuccess("Data berhasil disimpan!");
      }
      setFormProduksiBlending({
        tanggal: new Date().toISOString().split("T")[0],
        kategori: "Fresh",
        formula: "",
        tonase: 0,
      });
      setShowForm(false);
      setEditingIndex(null);
    } catch (error) {
      setShowLoadingOverlay(false);
      alert("Terjadi kesalahan saat menyimpan data");
    }
  };

  const handleSubmitProduksiNPKMini = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowLoadingOverlay(true);
    try {
      if (editingIndex !== null) {
        const updatedData = [...produksiNPKMiniData];
        updatedData[editingIndex] = formProduksiNPKMini;
        setProduksiNPKMiniData(updatedData);
        await updateData("produksi_npk_mini", formProduksiNPKMini);
        showSuccess("Data berhasil diupdate!");
      } else {
        await saveData("produksi_npk_mini", formProduksiNPKMini);
        setProduksiNPKMiniData([...produksiNPKMiniData, formProduksiNPKMini]);
        addNotification(
          "produksi_npk_mini",
          `Produksi NPK Mini tanggal ${new Date(
            formProduksiNPKMini.tanggal
          ).toLocaleDateString("id-ID")}`
        );
        showSuccess("Data berhasil disimpan!");
      }
      setFormProduksiNPKMini({
        tanggal: new Date().toISOString().split("T")[0],
        formulasi: "",
        tonase: 0,
      });
      setShowForm(false);
      setEditingIndex(null);
    } catch (error) {
      setShowLoadingOverlay(false);
      alert("Terjadi kesalahan saat menyimpan data");
    }
  };

  const handleSubmitTimesheetForklift = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowLoadingOverlay(true);
    try {
      if (editingIndex !== null) {
        const updatedData = [...timesheetForkliftData];
        updatedData[editingIndex] = formTimesheetForklift;
        setTimesheetForkliftData(updatedData);
        await updateData("timesheet_forklift", formTimesheetForklift);
        showSuccess("Data berhasil diupdate!");
      } else {
        await saveData("timesheet_forklift", formTimesheetForklift);
        setTimesheetForkliftData([
          ...timesheetForkliftData,
          formTimesheetForklift,
        ]);
        addNotification(
          "timesheet_forklift",
          `Timesheet Forklift (${
            formTimesheetForklift.forklift
          }) tanggal ${new Date(
            formTimesheetForklift.tanggal
          ).toLocaleDateString("id-ID")}`
        );
        showSuccess("Data berhasil disimpan!");
      }
      setFormTimesheetForklift({
        tanggal: new Date().toISOString().split("T")[0],
        forklift: "F19",
        deskripsiTemuan: "",
        jamOff: "",
        jamStart: "",
      });
      setShowForm(false);
      setEditingIndex(null);
    } catch (error) {
      setShowLoadingOverlay(false);
      alert("Terjadi kesalahan saat menyimpan data");
    }
  };

  const handleSubmitTimesheetLoader = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowLoadingOverlay(true);
    try {
      if (editingIndex !== null) {
        const updatedData = [...timesheetLoaderData];
        updatedData[editingIndex] = formTimesheetLoader;
        setTimesheetLoaderData(updatedData);
        await updateData("timesheet_loader", formTimesheetLoader);
        showSuccess("Data berhasil diupdate!");
      } else {
        await saveData("timesheet_loader", formTimesheetLoader);
        setTimesheetLoaderData([...timesheetLoaderData, formTimesheetLoader]);
        addNotification(
          "timesheet_loader",
          `Timesheet Loader tanggal ${new Date(
            formTimesheetLoader.tanggal
          ).toLocaleDateString("id-ID")}`
        );
        showSuccess("Data berhasil disimpan!");
      }
      setFormTimesheetLoader({
        tanggal: new Date().toISOString().split("T")[0],
        shift: "Malam",
        deskripsiTemuan: "",
        jamOff: "",
        jamStart: "",
      });
      setShowForm(false);
      setEditingIndex(null);
    } catch (error) {
      setShowLoadingOverlay(false);
      alert("Terjadi kesalahan saat menyimpan data");
    }
  };

  const handleSubmitDowntime = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowLoadingOverlay(true);
    try {
      if (editingIndex !== null) {
        // editingIndex mengacu ke index pada array yang sudah di-sort
        const sortedDowntime = sortByDateDesc(downtimeData);
        const oldItem = sortedDowntime[editingIndex];

        // Pastikan id tetap ikut saat update
        const payloadToUpdate = {
          ...formDowntime,
          id: oldItem.id ?? formDowntime.id,
        };

        await updateData("downtime", payloadToUpdate);

        // Setelah update, ambil ulang seluruh data downtime dari Google Sheets
        const refreshed = await fetchData("downtime");
        const normalizedDowntime = (refreshed || []).map((item: any) => {
          const formatTime = (value: any) => {
            if (value == null || value === "") return "";

            if (typeof value === "string") {
              const cleaned = value.startsWith("'")
                ? value.substring(1)
                : value;
              const m = cleaned.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/);
              if (m) {
                const h = String(Number(m[1])).padStart(2, "0");
                const mm = m[2];
                return `${h}:${mm}`;
              }
              return cleaned;
            }

            if (value instanceof Date) {
              const hours = String(value.getHours()).padStart(2, "0");
              const minutes = String(value.getMinutes()).padStart(2, "0");
              return `${hours}:${minutes}`;
            }

            if (typeof value === "number") {
              const excelEpoch = new Date(1899, 11, 30);
              const ms = value * 24 * 60 * 60 * 1000;
              const d = new Date(excelEpoch.getTime() + ms);
              const hours = String(d.getHours()).padStart(2, "0");
              const minutes = String(d.getMinutes()).padStart(2, "0");
              return `${hours}:${minutes}`;
            }

            return String(value);
          };

          return {
            ...item,
            jamOff: formatTime(item.jamOff),
            jamStart: formatTime(item.jamStart),
          };
        });

        setDowntimeData(normalizedDowntime);
        showSuccess("Data berhasil diupdate!");
      } else {
        await saveData("downtime", formDowntime);
        setDowntimeData([...downtimeData, formDowntime]);
        addNotification(
          "downtime",
          `Downtime ${formDowntime.item} tanggal ${new Date(
            formDowntime.tanggal
          ).toLocaleDateString("id-ID")}`
        );
        showSuccess("Data berhasil disimpan!");
      }
      setFormDowntime({
        tanggal: new Date().toISOString().split("T")[0],
        item: "",
        deskripsi: "",
        jamOff: "",
        jamStart: "",
      });
      setShowForm(false);
      setEditingIndex(null);
    } catch (error) {
      setShowLoadingOverlay(false);
      alert("Terjadi kesalahan saat menyimpan data");
    }
  };

  const handleSubmitWorkRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowLoadingOverlay(true);
    try {
      if (editingIndex !== null) {
        // editingIndex mengacu ke index pada array yang sudah di-sort
        const sortedWR = sortByDateDesc(workRequestData);
        const oldItem = sortedWR[editingIndex];

        // Pastikan id tetap ikut saat update
        const currentWR: any = formWorkRequest as any;
        const payloadToUpdate: any = {
          ...formWorkRequest,
          id: oldItem.id ?? currentWR.id,
        };
        if (!payloadToUpdate.id && currentWR.__original) {
          payloadToUpdate.__original = currentWR.__original;
        }

        await updateData("work_request", payloadToUpdate);

        // Setelah update, ambil ulang seluruh data work_request dari Google Sheets
        const refreshed = await fetchData("work_request");
        const normalizedWR = (refreshed || []).map((item: any) => {
          let tanggal = item.tanggal;

          if (tanggal instanceof Date) {
            const year = tanggal.getFullYear();
            const month = String(tanggal.getMonth() + 1).padStart(2, "0");
            const day = String(tanggal.getDate()).padStart(2, "0");
            tanggal = `${year}-${month}-${day}`;
          } else if (
            typeof tanggal === "string" &&
            !tanggal.match(/^\d{4}-\d{2}-\d{2}$/)
          ) {
            tanggal = normalizeDateForInput(tanggal);
          }

          return { ...item, tanggal };
        });

        setWorkRequestData(normalizedWR);
        showSuccess("Data berhasil diupdate!");
      } else {
        await saveData("work_request", formWorkRequest);
        const refreshed = await fetchData("work_request");
        const normalizedWR = (refreshed || []).map((item: any) => {
          let tanggal = item.tanggal;
          if (tanggal instanceof Date) {
            const year = tanggal.getFullYear();
            const month = String(tanggal.getMonth() + 1).padStart(2, "0");
            const day = String(tanggal.getDate()).padStart(2, "0");
            tanggal = `${year}-${month}-${day}`;
          } else if (
            typeof tanggal === "string" &&
            !tanggal.match(/^\d{4}-\d{2}-\d{2}$/)
          ) {
            tanggal = normalizeDateForInput(tanggal);
          }
          return { ...item, tanggal };
        });
        setWorkRequestData(normalizedWR);
        addNotification(
          "work_request",
          `Work Request ${formWorkRequest.nomorWR} (${formWorkRequest.item})`
        );
        showSuccess("Data berhasil disimpan!");
      }
      setFormWorkRequest({
        tanggal: new Date().toISOString().split("T")[0],
        nomorWR: "",
        item: "",
        area: "",
        eksekutor: "",
        include: "",
        deskripsiPekerjaan: "",
      });
      setShowForm(false);
      setEditingIndex(null);
    } catch (error) {
      setShowLoadingOverlay(false);
      alert("Terjadi kesalahan saat menyimpan data");
    }
  };

  const handleSubmitBahanBaku = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowLoadingOverlay(true);
    try {
      if (editingIndex !== null) {
        // Cari item lama berdasarkan id yang ada di form (lebih stabil daripada index sort)
        const currentForm: any = formBahanBaku as any;
        const oldItemById = bahanBakuData.find(
          (row) => row.id && currentForm.id && row.id === currentForm.id
        );

        // Jika tidak ketemu lewat id (misal data lama belum punya id), fallback ke metode lama
        let oldItem = oldItemById;
        if (!oldItem) {
          const sortedBahan = sortByDateDesc(bahanBakuData);
          oldItem = sortedBahan[editingIndex];
        }

        const payloadToUpdate: any = {
          ...formBahanBaku,
          id: oldItem?.id, // pertahankan id agar update apps script tepat
        };
        // Sertakan snapshot original jika id belum ada (legacy row)
        if (!oldItem?.id && currentForm.__original) {
          payloadToUpdate.__original = currentForm.__original;
        }

        await updateData("bahan_baku", payloadToUpdate);
        const refreshed = await fetchData("bahan_baku");
        setBahanBakuData(refreshed);
        showSuccess("Data berhasil diupdate!");
      } else {
        await saveData("bahan_baku", formBahanBaku);
        addNotification(
          "bahan_baku",
          `Bahan Baku ${formBahanBaku.jenisBahanBaku} (${
            formBahanBaku.tonase
          } ton) tanggal ${new Date(formBahanBaku.tanggal).toLocaleDateString(
            "id-ID"
          )}`
        );
        const refreshed = await fetchData("bahan_baku");
        setBahanBakuData(refreshed);
        showSuccess("Data berhasil disimpan!");
      }
      setFormBahanBaku({
        tanggal: new Date().toISOString().split("T")[0],
        jenisBahanBaku: "Urea",
        tonase: 0,
        keterangan: "",
      });
      setShowForm(false);
      setEditingIndex(null);
    } catch (error) {
      setShowLoadingOverlay(false);
      alert("Terjadi kesalahan saat menyimpan data");
    }
  };

  const handleSubmitVibrasi = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowLoadingOverlay(true);
    try {
      if (editingIndex !== null) {
        const current: any = formVibrasi as any;
        const oldItem = vibrasiData.find((r) => r.id && r.id === current.id);
        const payload: any = { ...formVibrasi, id: oldItem?.id || current.id };
        if (!payload.id && current.__original) {
          payload.__original = current.__original;
        }
        await updateData("vibrasi", payload);
        const refreshed = await fetchData("vibrasi");
        setVibrasiData(refreshed || []);
        showSuccess("Data berhasil diupdate!");
      } else {
        await saveData("vibrasi", formVibrasi);
        addNotification(
          "vibrasi",
          `Vibrasi ${formVibrasi.equipment} (${
            formVibrasi.position
          }) tanggal ${new Date(formVibrasi.tanggal).toLocaleDateString(
            "id-ID"
          )}`
        );
        const refreshed = await fetchData("vibrasi");
        setVibrasiData(refreshed || []);
        showSuccess("Data berhasil disimpan!");
      }
      setFormVibrasi({
        tanggal: new Date().toISOString().split("T")[0],
        equipment: "",
        position: "Horizontal",
        point: "A",
        nilai: 0,
        keterangan: "",
      });
      setShowForm(false);
      setEditingIndex(null);
    } catch (error) {
      setShowLoadingOverlay(false);
      alert("Terjadi kesalahan saat menyimpan data");
    }
  };

  const handleSubmitGatePass = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowLoadingOverlay(true);
    try {
      if (editingIndex !== null) {
        const current: any = formGatePass as any;
        const oldItem = gatePassData.find((r) => r.id && r.id === current.id);
        const payload: any = { ...formGatePass, id: oldItem?.id || current.id };
        if (!payload.id && current.__original) {
          payload.__original = current.__original;
        }
        await updateData("gate_pass", payload);
        const refreshed = await fetchData("gate_pass");
        setGatePassData(refreshed || []);
        showSuccess("Data berhasil diupdate!");
      } else {
        await saveData("gate_pass", formGatePass);
        addNotification(
          "gate_pass",
          `Gate Pass ${formGatePass.noFile} - ${formGatePass.namaBarang}`
        );
        const refreshed = await fetchData("gate_pass");
        setGatePassData(refreshed || []);
        showSuccess("Data berhasil disimpan!");
      }
      generateGatePassNumber();
      setFormGatePass({
        noFile: "",
        noPol: "",
        pemilikBarang: "",
        namaPembawa: "",
        namaBarang: "",
        alasanMengeluarkan: "",
        tanggal: new Date().toISOString().split("T")[0],
        approver: "",
      });
      setShowForm(false);
      setEditingIndex(null);
    } catch (error) {
      setShowLoadingOverlay(false);
      alert("Terjadi kesalahan saat menyimpan data");
    }
  };

  const handleViewAkun = (item: Akun) => {
    setPasswordModal({ show: true, pendingAkun: item });
    setPasswordInput("");
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === "admreguler") {
      setViewAkunModal({ show: true, data: passwordModal.pendingAkun });
      setPasswordModal({ show: false, pendingAkun: null });
      setPasswordInput("");
    } else {
      alert("Password salah!");
      setPasswordInput("");
    }
  };

  const handleCopyText = (text: string, label: string, key: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopySuccess({ ...copySuccess, [key]: true });
        setTimeout(() => {
          setCopySuccess({ ...copySuccess, [key]: false });
        }, 2000);
      })
      .catch(() => {
        console.error(`Gagal menyalin ${label}`);
      });
  };

  const handleOpenLoginLink = (
    url: string,
    _username: string,
    _password: string,
    key: string
  ) => {
    // Open URL in new tab
    window.open(url, "_blank");
    // Show success animation
    setCopySuccess({ ...copySuccess, [key]: true });
    setTimeout(() => {
      setCopySuccess({ ...copySuccess, [key]: false });
    }, 2000);
  };

  // Removed unused function handleOpenAndCopy - was not being used in the application

  const handleSubmitAkun = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowLoadingOverlay(true);
    try {
      if (editingIndex !== null) {
        const current: any = formAkun as any;
        const oldById = akunData.find(
          (r) => r.id && current.id && r.id === current.id
        );
        let oldItem = oldById;
        if (!oldItem) {
          oldItem = akunData[editingIndex];
        }
        const payload: any = { ...formAkun, id: oldItem?.id || current.id };
        if (!payload.id && current.__original) {
          payload.__original = current.__original;
        }
        await updateData("akun", payload);
        const refreshed = await fetchData("akun");
        setAkunData(refreshed || []);
        showSuccess("Data berhasil diupdate!");
      } else {
        await saveData("akun", formAkun);
        addNotification("akun", `Akun ${formAkun.noBadge} - ${formAkun.nama}`);
        const refreshed = await fetchData("akun");
        setAkunData(refreshed || []);
        showSuccess("Data berhasil disimpan!");
      }
      setFormAkun({
        noBadge: "",
        nama: "",
        jabatan: "",
        passwordESS: "",
        passwordPismart: "",
        passwordDOF: "",
        tanggalUpdate: new Date().toISOString().split("T")[0],
      });
      setShowForm(false);
      setEditingIndex(null);
    } catch (error) {
      setShowLoadingOverlay(false);
      alert("Terjadi kesalahan saat menyimpan data");
    }
  };

  const handleSubmitRKAP = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowLoadingOverlay(true);
    try {
      if (editingIndex !== null) {
        const current: any = formRKAP as any;
        const oldById = rkapData.find(
          (r) => r.id && current.id && r.id === current.id
        );
        let oldItem = oldById;
        if (!oldItem) {
          // fallback by bulan if id missing
          oldItem = rkapData[editingIndex];
        }
        const payload: any = { ...formRKAP, id: oldItem?.id || current.id };
        if (!payload.id && current.__original) {
          payload.__original = current.__original;
        }
        await updateData("rkap", payload);
        const refreshed = await fetchData("rkap");
        setRkapData(refreshed || []);
        showSuccess("Data berhasil diupdate!");
      } else {
        await saveData("rkap", formRKAP);
        addNotification(
          "rkap",
          `RKAP ${formRKAP.bulan} (Target: ${formRKAP.targetRKAP} ton)`
        );
        const refreshed = await fetchData("rkap");
        setRkapData(refreshed || []);
        showSuccess("Data berhasil disimpan!");
      }
      setFormRKAP({
        bulan: "Januari",
        targetRKAP: 0,
      });
      setShowForm(false);
      setEditingIndex(null);
    } catch (error) {
      setShowLoadingOverlay(false);
      alert("Terjadi kesalahan saat menyimpan data");
    }
  };

  // Delete handlers
  const handleDelete = async (index: number, dataType: string, item?: any) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      setShowLoadingOverlay(true);
      try {
        let dataToDelete;

        switch (dataType) {
          case "produksi_npk":
            dataToDelete = produksiNPKData[index];
            await deleteDataFromSheet("produksi_npk", dataToDelete);
            const newNPKData = produksiNPKData.filter((_, i) => i !== index);
            setProduksiNPKData(newNPKData);
            break;
          case "produksi_blending":
            dataToDelete = produksiBlendingData[index];
            await deleteDataFromSheet("produksi_blending", dataToDelete);
            const newBlendingData = produksiBlendingData.filter(
              (_, i) => i !== index
            );
            setProduksiBlendingData(newBlendingData);
            break;
          case "produksi_npk_mini":
            dataToDelete = produksiNPKMiniData[index];
            await deleteDataFromSheet("produksi_npk_mini", dataToDelete);
            const newMiniData = produksiNPKMiniData.filter(
              (_, i) => i !== index
            );
            setProduksiNPKMiniData(newMiniData);
            break;
          case "timesheet_forklift":
            dataToDelete = timesheetForkliftData[index];
            await deleteDataFromSheet("timesheet_forklift", dataToDelete);
            const newForkliftData = timesheetForkliftData.filter(
              (_, i) => i !== index
            );
            setTimesheetForkliftData(newForkliftData);
            break;
          case "timesheet_loader":
            dataToDelete = timesheetLoaderData[index];
            await deleteDataFromSheet("timesheet_loader", dataToDelete);
            const newLoaderData = timesheetLoaderData.filter(
              (_, i) => i !== index
            );
            setTimesheetLoaderData(newLoaderData);
            break;
          case "downtime":
            // Untuk downtime, gunakan langsung item yang dikirim dari tabel
            // sehingga tidak ada salah mapping index setelah sort & paginate.
            const downtimeItemToDelete = item || downtimeData[index];
            dataToDelete = downtimeItemToDelete;
            await deleteDataFromSheet("downtime", dataToDelete);
            const newDowntimeData = downtimeData.filter(
              (row) =>
                (downtimeItemToDelete.id &&
                  row.id !== downtimeItemToDelete.id) ||
                (!downtimeItemToDelete.id && row !== downtimeItemToDelete)
            );
            setDowntimeData(newDowntimeData);
            break;
          case "work_request":
            // Untuk work_request, gunakan langsung item yang dikirim dari tabel
            // sehingga tidak ada salah mapping index setelah sort & paginate.
            const wrItemToDelete = item || workRequestData[index];
            dataToDelete = wrItemToDelete;
            await deleteDataFromSheet("work_request", dataToDelete);
            // Refresh dari backend untuk memastikan baris yang terhapus sesuai
            {
              const refreshed = await fetchData("work_request");
              const normalizedWR = (refreshed || []).map((item: any) => {
                let tanggal = item.tanggal;
                if (tanggal instanceof Date) {
                  const year = tanggal.getFullYear();
                  const month = String(tanggal.getMonth() + 1).padStart(2, "0");
                  const day = String(tanggal.getDate()).padStart(2, "0");
                  tanggal = `${year}-${month}-${day}`;
                } else if (
                  typeof tanggal === "string" &&
                  !tanggal.match(/^\d{4}-\d{2}-\d{2}$/)
                ) {
                  tanggal = normalizeDateForInput(tanggal);
                }
                return { ...item, tanggal };
              });
              setWorkRequestData(normalizedWR);
            }
            break;
          case "bahan_baku":
            // Untuk bahan_baku, gunakan langsung item yang dikirim dari tabel
            // sehingga tidak ada salah mapping index setelah sort & paginate.
            const bahanItemToDelete = item || bahanBakuData[index];
            dataToDelete = bahanItemToDelete;
            await deleteDataFromSheet("bahan_baku", dataToDelete);
            // Refresh data dari backend setelah delete untuk memastikan konsistensi
            const refreshedBahan = await fetchData("bahan_baku");
            setBahanBakuData(refreshedBahan);
            break;
          case "vibrasi":
            dataToDelete = item || vibrasiData[index];
            await deleteDataFromSheet("vibrasi", dataToDelete);
            {
              const refreshed = await fetchData("vibrasi");
              setVibrasiData(refreshed || []);
            }
            break;
          case "gate_pass":
            dataToDelete = item || gatePassData[index];
            await deleteDataFromSheet("gate_pass", dataToDelete);
            {
              const refreshed = await fetchData("gate_pass");
              setGatePassData(refreshed || []);
            }
            break;
          case "akun":
            dataToDelete = item || akunData[index];
            await deleteDataFromSheet("akun", dataToDelete);
            {
              const refreshed = await fetchData("akun");
              setAkunData(refreshed || []);
            }
            break;
          case "rkap":
            dataToDelete = item || rkapData[index];
            await deleteDataFromSheet("rkap", dataToDelete);
            {
              const refreshed = await fetchData("rkap");
              setRkapData(refreshed || []);
            }
            break;
        }
        showSuccess("Data berhasil dihapus!");
      } catch (error) {
        setShowLoadingOverlay(false);
        console.error("Error deleting data:", error);
        alert("Terjadi kesalahan saat menghapus data");
      }
    }
  };

  // Edit handlers
  const handleEdit = (index: number, dataType: string) => {
    setEditingIndex(index);
    setShowForm(true);

    switch (dataType) {
      case "produksi_npk":
        const npkData = produksiNPKData[index];
        setFormProduksiNPK({
          ...npkData,
          tanggal: normalizeDateForInput(npkData.tanggal),
        });
        break;
      case "produksi_blending":
        const blendingData = produksiBlendingData[index];
        setFormProduksiBlending({
          ...blendingData,
          tanggal: normalizeDateForInput(blendingData.tanggal),
        });
        break;
      case "produksi_npk_mini":
        const miniData = produksiNPKMiniData[index];
        setFormProduksiNPKMini({
          ...miniData,
          tanggal: normalizeDateForInput(miniData.tanggal),
        });
        break;
      case "timesheet_forklift":
        const forkliftData = timesheetForkliftData[index];
        setFormTimesheetForklift({
          ...forkliftData,
          tanggal: normalizeDateForInput(forkliftData.tanggal),
        });
        break;
      case "timesheet_loader":
        const loaderData = timesheetLoaderData[index];
        setFormTimesheetLoader({
          ...loaderData,
          tanggal: normalizeDateForInput(loaderData.tanggal),
        });
        break;
      case "downtime":
        // Untuk downtime, table menampilkan data yang sudah di-sort desc.
        // index yang dikirim dari table adalah index di array ter-sort,
        // jadi kita ambil dari hasil sortByDateDesc agar baris yang diedit tepat.
        const sortedDowntime = sortByDateDesc(downtimeData);
        const downtimeEditData = sortedDowntime[index];
        setFormDowntime({
          ...downtimeEditData,
          tanggal: normalizeDateForInput(downtimeEditData.tanggal),
        });
        break;
      case "work_request":
        // Untuk work_request, table menampilkan data yang sudah di-sort desc.
        // index yang dikirim dari table adalah index di array ter-sort,
        // jadi kita ambil dari hasil sortByDateDesc agar baris yang diedit tepat.
        const sortedWR = sortByDateDesc(workRequestData);
        const wrData = sortedWR[index];
        setFormWorkRequest({
          ...wrData,
          tanggal:
            typeof wrData.tanggal === "string"
              ? wrData.tanggal
              : normalizeDateForInput(wrData.tanggal),
        } as any);
        break;
      case "bahan_baku":
        // Untuk bahan_baku, table menampilkan data yang sudah di-sort desc.
        // index yang dikirim dari table adalah index di array ter-sort,
        // jadi kita ambil dari hasil sortByDateDesc agar baris yang diedit tepat.
        const sortedBahan = sortByDateDesc(bahanBakuData);
        const bahanData = sortedBahan[index];
        // Simpan snapshot original untuk baris tanpa id agar update bisa menemukan row lama.
        setFormBahanBaku({
          ...bahanData,
          tanggal: normalizeDateForInput(bahanData.tanggal),
          __original: { ...bahanData },
        } as any);
        break;
      case "vibrasi":
        const vibrasiEditData = vibrasiData[index];
        setFormVibrasi({
          ...vibrasiEditData,
          tanggal: normalizeDateForInput(vibrasiEditData.tanggal),
          __original: { ...vibrasiEditData },
        } as any);
        break;
      case "gate_pass":
        const gateData = gatePassData[index];
        setFormGatePass({
          ...gateData,
          tanggal: normalizeDateForInput(gateData.tanggal),
          __original: { ...gateData },
        } as any);
        break;
      case "akun":
        const akunEditData = akunData[index];
        setFormAkun({
          ...akunEditData,
          tanggalUpdate: normalizeDateForInput(akunEditData.tanggalUpdate),
          __original: { ...akunEditData },
        } as any);
        break;
      case "rkap":
        const rkapEditData: any = rkapData[index];
        setFormRKAP({
          ...rkapEditData,
          __original: { ...rkapEditData },
        } as any);
        break;
    }
  };

  // Pagination helper function
  const sortByDateDesc = <T extends { tanggal: string | Date }>(
    data: T[]
  ): T[] => {
    return [...data].sort((a, b) => {
      const dateA = new Date(a.tanggal).getTime();
      const dateB = new Date(b.tanggal).getTime();
      return dateB - dateA; // Sort descending (newest first)
    });
  };

  const sortByUpdateDateDesc = <T extends { tanggalUpdate: string | Date }>(
    data: T[]
  ): T[] => {
    return [...data].sort((a, b) => {
      const dateA = new Date(a.tanggalUpdate).getTime();
      const dateB = new Date(b.tanggalUpdate).getTime();
      return dateB - dateA; // Sort descending (newest first)
    });
  };

  const paginateData = <T,>(data: T[], page: number, perPage: number): T[] => {
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    return data.slice(startIndex, endIndex);
  };

  const getTotalPages = (dataLength: number, perPage: number): number => {
    return Math.ceil(dataLength / perPage);
  };

  const handlePageChange = (key: string, page: number) => {
    setCurrentPage((prev) => ({ ...prev, [key]: page }));
  };

  // Print function for Produksi NPK
  const handlePrintNPK = () => {
    const { startDate, endDate } = printDateRange;

    // Filter data by date range (gunakan tanggal lokal tanpa efek timezone)
    const toLocalDateOnly = (dateStr: string) => {
      const [year, month, day] = dateStr.split("-").map(Number);
      return new Date(year, (month || 1) - 1, day || 1);
    };

    const start = toLocalDateOnly(startDate);
    const end = toLocalDateOnly(endDate);

    const filteredData = produksiNPKData.filter((item) => {
      const itemDate = toLocalDateOnly(String(item.tanggal));
      return itemDate >= start && itemDate <= end;
    });

    // Sort by date ascending for report
    const sortedData = [...filteredData].sort((a, b) => {
      return new Date(a.tanggal).getTime() - new Date(b.tanggal).getTime();
    });

    // Calculate subtotals
    let totalMalamOnspek = 0,
      totalMalamOffspek = 0;
    let totalPagiOnspek = 0,
      totalPagiOffspek = 0;
    let totalSoreOnspek = 0,
      totalSoreOffspek = 0;

    sortedData.forEach((item) => {
      totalMalamOnspek += Number(item.shiftMalamOnspek) || 0;
      totalMalamOffspek += Number(item.shiftMalamOffspek) || 0;
      totalPagiOnspek += Number(item.shiftPagiOnspek) || 0;
      totalPagiOffspek += Number(item.shiftPagiOffspek) || 0;
      totalSoreOnspek += Number(item.shiftSoreOnspek) || 0;
      totalSoreOffspek += Number(item.shiftSoreOffspek) || 0;
    });

    const totalOnspek = totalMalamOnspek + totalPagiOnspek + totalSoreOnspek;
    const totalOffspek =
      totalMalamOffspek + totalPagiOffspek + totalSoreOffspek;
    const grandTotal = totalOnspek + totalOffspek;

    // Format date for display
    const formatDateIndo = (dateStr: string) => {
      const [year, month, day] = dateStr.split("-").map(Number);
      const date = new Date(year, (month || 1) - 1, day || 1);
      return `${date.getDate().toString().padStart(2, "0")}/${(
        date.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}/${date.getFullYear()}`;
    };

    const formatPeriod = () => {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const months = [
        "JANUARY",
        "FEBRUARY",
        "MARCH",
        "APRIL",
        "MAY",
        "JUNE",
        "JULY",
        "AUGUST",
        "SEPTEMBER",
        "OCTOBER",
        "NOVEMBER",
        "DECEMBER",
      ];
      return `${start.getDate()} - ${end.getDate()} ${
        months[end.getMonth()]
      } ${end.getFullYear()}`;
    };

    const today = new Date();
    const todayFormatted = `${today.getDate()} ${
      [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ][today.getMonth()]
    } ${today.getFullYear()}`;

    // Generate print HTML
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>LAPORAN PRODUKSI NPK GRANUL 2</title>
          <style>
            @page {
              size: A4 portrait;
              margin: 15mm;
            }
            body {
              font-family: Arial, sans-serif;
              font-size: 10pt;
              margin: 0;
              padding: 20px;
            }
            .header {
              text-align: center;
              margin-bottom: 20px;
            }
            .header h2 {
              margin: 5px 0;
              font-size: 14pt;
              font-weight: bold;
            }
            .header h3 {
              margin: 5px 0;
              font-size: 12pt;
              font-weight: normal;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 30px;
            }
            th, td {
              border: 1px solid #000;
              padding: 6px 4px;
              text-align: center;
            }
            th {
              background-color: #f0f0f0;
              font-weight: bold;
              font-size: 9pt;
            }
            td {
              font-size: 9pt;
            }
            .number-cell {
              text-align: right;
              padding-right: 8px;
            }
            .subtotal-row {
              font-weight: bold;
              background-color: #e8e8e8;
            }
            .footer {
              display: flex;
              justify-content: space-between;
              margin-top: 40px;
              padding: 0 50px;
            }
            .signature-box {
              text-align: center;
              width: 200px;
            }
            .signature-line {
              margin-top: 60px;
              border-top: 1px solid #000;
              padding-top: 5px;
            }
            @media print {
              body {
                padding: 0;
              }
              .no-print {
                display: none;
              }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>LAPORAN PRODUKSI NPK GRANUL 2</h2>
            <h3>PERIODE : ${formatPeriod()}</h3>
          </div>

          <table>
            <thead>
              <tr>
                <th rowspan="2" style="vertical-align: middle;">TANGGAL</th>
                <th colspan="2">MALAM</th>
                <th colspan="2">PAGI</th>
                <th colspan="2">SORE</th>
                <th colspan="2">TOTAL</th>
                <th rowspan="2" style="vertical-align: middle;">S. TOTAL</th>
              </tr>
              <tr>
                <th>Onspek</th>
                <th>Offspek</th>
                <th>Onspek</th>
                <th>Offspek</th>
                <th>Onspek</th>
                <th>Offspek</th>
                <th>Onspek</th>
                <th>Offspek</th>
              </tr>
            </thead>
            <tbody>
              ${sortedData
                .map((item) => {
                  const malamOn = Number(item.shiftMalamOnspek) || 0;
                  const malamOff = Number(item.shiftMalamOffspek) || 0;
                  const pagiOn = Number(item.shiftPagiOnspek) || 0;
                  const pagiOff = Number(item.shiftPagiOffspek) || 0;
                  const soreOn = Number(item.shiftSoreOnspek) || 0;
                  const soreOff = Number(item.shiftSoreOffspek) || 0;
                  const rowTotalOn = malamOn + pagiOn + soreOn;
                  const rowTotalOff = malamOff + pagiOff + soreOff;
                  const rowTotal = rowTotalOn + rowTotalOff;

                  return `
                  <tr>
                    <td>${formatDateIndo(item.tanggal)}</td>
                    <td class="number-cell">${malamOn.toFixed(2)}</td>
                    <td class="number-cell">${malamOff.toFixed(2)}</td>
                    <td class="number-cell">${pagiOn.toFixed(2)}</td>
                    <td class="number-cell">${pagiOff.toFixed(2)}</td>
                    <td class="number-cell">${soreOn.toFixed(2)}</td>
                    <td class="number-cell">${soreOff.toFixed(2)}</td>
                    <td class="number-cell">${rowTotalOn.toFixed(2)}</td>
                    <td class="number-cell">${rowTotalOff.toFixed(2)}</td>
                    <td class="number-cell">${rowTotal.toFixed(2)}</td>
                  </tr>
                `;
                })
                .join("")}
              <tr class="subtotal-row">
                <td>SUBTOTAL</td>
                <td class="number-cell">${totalMalamOnspek.toFixed(2)}</td>
                <td class="number-cell">${totalMalamOffspek.toFixed(2)}</td>
                <td class="number-cell">${totalPagiOnspek.toFixed(2)}</td>
                <td class="number-cell">${totalPagiOffspek.toFixed(2)}</td>
                <td class="number-cell">${totalSoreOnspek.toFixed(2)}</td>
                <td class="number-cell">${totalSoreOffspek.toFixed(2)}</td>
                <td class="number-cell">${totalOnspek.toFixed(2)}</td>
                <td class="number-cell">${totalOffspek.toFixed(2)}</td>
                <td class="number-cell">${grandTotal.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

          <div class="footer">
            <div class="signature-box">
              <div>&nbsp;</div>
              <div style="margin-top: 10px;">Mengetahui</div>
              <div>AVP NPKG 2 & Blending</div>
              <div class="signature-line">Soewartono 3972109</div>
            </div>
            <div class="signature-box">
              <div>Cikampek, ${todayFormatted}</div>
              <div style="margin-top: 10px;">Dibuat Oleh</div>
              <div>Supervisor Produksi</div>
              <div class="signature-line">
                (${printSupervisorName || ""} ${printSupervisorBadge || ""})
              </div>
            </div>
          </div>

          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
        </html>
      `);
      printWindow.document.close();
    }

    setShowPrintModal(false);
  };

  // Print function for Produksi Blending (Over Sack)
  const handlePrintBlending = () => {
    const { startDate, endDate } = printBlendingDateRange;

    const toLocalDateOnly = (dateStr: string) => {
      const [year, month, day] = dateStr.split("-").map(Number);
      return new Date(year, (month || 1) - 1, day || 1);
    };

    const start = toLocalDateOnly(startDate);
    const end = toLocalDateOnly(endDate);

    const filteredData = produksiBlendingData
      .filter((item) => item.kategori === "Oversack")
      .filter((item) => {
        const itemDate = toLocalDateOnly(String(item.tanggal));
        return itemDate >= start && itemDate <= end;
      });

    const sortedData = [...filteredData].sort((a, b) => {
      return new Date(a.tanggal).getTime() - new Date(b.tanggal).getTime();
    });

    const formatDateLongIndo = (dateStr: string) => {
      const [year, month, day] = dateStr.split("-").map(Number);
      const date = new Date(year, (month || 1) - 1, day || 1);
      const months = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ];
      return `${date.getDate()} ${
        months[date.getMonth()]
      } ${date.getFullYear()}`;
    };

    const formatPeriodText = () => {
      return `${formatDateLongIndo(startDate)} - ${formatDateLongIndo(
        endDate
      )}`;
    };

    const subtotalTonase = sortedData.reduce(
      (sum, item) => sum + (Number(item.tonase) || 0),
      0
    );

    const today = new Date();
    const todayFormatted = formatDateLongIndo(
      `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(today.getDate()).padStart(2, "0")}`
    );

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>LAPORAN PRODUKSI BLENDING (OVER SACK)</title>
          <style>
            @page {
              size: A4 portrait;
              margin: 15mm;
            }
            body {
              font-family: Arial, sans-serif;
              font-size: 10pt;
              margin: 0;
            }
            table {
              border-collapse: collapse;
              width: 100%;
            }
            th, td {
              border: 1px solid #000;
              padding: 4px 6px;
              text-align: left;
            }
            .no-border td,
            .title-row td {
              border: none;
            }
            .center {
              text-align: center;
            }
            .right {
              text-align: right;
            }
            .bold {
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <table>
            <tr class="title-row">
              <td class="center bold" colspan="3">LAPORAN PRODUKSI BLENDING (OVER SACK)</td>
            </tr>
            <tr class="title-row">
              <td class="center bold" colspan="3">PERIODE : ${formatPeriodText().toUpperCase()}</td>
            </tr>
            <tr class="title-row"><td colspan="3"></td></tr>
            <tr class="bold">
              <td class="center">TANGGAL</td>
              <td class="center">FORMULASI</td>
              <td class="center">TONASE</td>
            </tr>
            ${sortedData
              .map(
                (item) => `
              <tr>
                <td>${formatDateLongIndo(item.tanggal)}</td>
                <td class="center">${item.formula || "-"}</td>
                <td class="right">${
                  item.tonase
                    ? Number(item.tonase).toLocaleString("id-ID", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }) + " Ton"
                    : "-"
                }</td>
              </tr>
            `
              )
              .join("")}
            <tr class="bold">
              <td class="center">SUBTOTAL</td>
              <td></td>
              <td class="right">${
                subtotalTonase.toLocaleString("id-ID", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) + " Ton"
              }</td>
            </tr>
            <tr class="no-border"><td colspan="3" style="height: 20px;"></td></tr>
            <tr class="no-border">
              <td colspan="3" class="right">Cikampek, ${todayFormatted}</td>
            </tr>
            <tr class="no-border"><td colspan="3" style="height: 20px;"></td></tr>
            <tr class="no-border">
              <td class="center">Section Head</td>
              <td></td>
              <td class="center">AVP NPK 2 & Blending</td>
            </tr>
            <tr class="no-border"><td colspan="3" style="height: 50px;"></td></tr>
            <tr class="no-border">
              <td class="center">${
                printBlendingSectionHeadName || "Yohan Triyono"
              }</td>
              <td></td>
              <td class="center">Soewartono</td>
            </tr>
            <tr class="no-border">
              <td class="center">${
                printBlendingSectionHeadBadge || "3052363"
              }</td>
              <td></td>
              <td class="center">3972109</td>
            </tr>
          </table>

          <script>
            window.onload = function() { window.print(); };
          </script>
        </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  // Print function for Produksi NPK Mini
  const handlePrintNPKMini = () => {
    const { startDate, endDate } = printMiniDateRange;

    const toLocalDateOnly = (dateStr: string) => {
      const [year, month, day] = dateStr.split("-").map(Number);
      return new Date(year, (month || 1) - 1, day || 1);
    };

    const start = toLocalDateOnly(startDate);
    const end = toLocalDateOnly(endDate);

    const filteredData = produksiNPKMiniData.filter((item) => {
      const itemDate = toLocalDateOnly(String(item.tanggal));
      return itemDate >= start && itemDate <= end;
    });

    const sortedData = [...filteredData].sort((a, b) => {
      return new Date(a.tanggal).getTime() - new Date(b.tanggal).getTime();
    });

    const formatDateLongIndo = (dateStr: string) => {
      const [year, month, day] = dateStr.split("-").map(Number);
      const date = new Date(year, (month || 1) - 1, day || 1);
      const months = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ];
      return `${date.getDate()} ${
        months[date.getMonth()]
      } ${date.getFullYear()}`;
    };

    const formatPeriodText = () => {
      return `${formatDateLongIndo(startDate)} - ${formatDateLongIndo(
        endDate
      )}`;
    };

    const subtotalTonase = sortedData.reduce(
      (sum, item) => sum + (Number(item.tonase) || 0),
      0
    );

    const today = new Date();
    const todayFormatted = formatDateLongIndo(
      `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(today.getDate()).padStart(2, "0")}`
    );

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>LAPORAN PRODUKSI NPK MINI</title>
          <style>
            @page {
              size: A4 portrait;
              margin: 15mm;
            }
            body {
              font-family: Arial, sans-serif;
              font-size: 10pt;
              margin: 0;
            }
            table {
              border-collapse: collapse;
              width: 100%;
            }
            th, td {
              border: 1px solid #000;
              padding: 4px 6px;
              text-align: left;
            }
            .no-border td,
            .title-row td {
              border: none;
            }
            .center {
              text-align: center;
            }
            .right {
              text-align: right;
            }
            .bold {
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <table>
            <tr class="title-row">
              <td class="center bold" colspan="3">LAPORAN PRODUKSI NPK MINI</td>
            </tr>
            <tr class="title-row">
              <td class="center bold" colspan="3">PERIODE : ${formatPeriodText().toUpperCase()}</td>
            </tr>
            <tr class="title-row"><td colspan="3"></td></tr>
            <tr class="bold">
              <td class="center">TANGGAL</td>
              <td class="center">FORMULASI</td>
              <td class="center">TONASE</td>
            </tr>
            ${sortedData
              .map(
                (item) => `
              <tr>
                <td>${formatDateLongIndo(item.tanggal)}</td>
                <td class="center">${item.formulasi || "-"}</td>
                <td class="right">${
                  item.tonase
                    ? Number(item.tonase).toLocaleString("id-ID", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }) + " Ton"
                    : "-"
                }</td>
              </tr>
            `
              )
              .join("")}
            <tr class="bold">
              <td class="center">SUBTOTAL</td>
              <td></td>
              <td class="right">${
                subtotalTonase.toLocaleString("id-ID", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }) + " Ton"
              }</td>
            </tr>
            <tr class="no-border"><td colspan="3" style="height: 20px;"></td></tr>
            <tr class="no-border">
              <td colspan="3" class="right">Cikampek, ${todayFormatted}</td>
            </tr>
            <tr class="no-border"><td colspan="3" style="height: 40px;"></td></tr>
            <tr class="no-border">
              <td></td>
              <td></td>
              <td class="center">Mengetahui</td>
            </tr>
            <tr class="no-border"><td colspan="3" style="height: 60px;"></td></tr>
            <tr class="no-border">
              <td></td>
              <td></td>
              <td class="center">Soewartono</td>
            </tr>
            <tr class="no-border">
              <td></td>
              <td></td>
              <td class="center">3972109</td>
            </tr>
          </table>

          <script>
            window.onload = function() { window.print(); };
          </script>
        </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  // Calculate downtime per item for selected month
  const calculateDowntimePerItem = () => {
    const [year, month] = downtimeChartMonth.split("-").map(Number);

    const filteredData = downtimeData.filter((item) => {
      const [itemYear, itemMonth] = String(item.tanggal).split("-").map(Number);
      return itemYear === year && itemMonth === month;
    });

    // Group by item and sum downtime
    const itemMap = new Map<string, number>();

    filteredData.forEach((item) => {
      const itemName = item.item || "Unknown";
      const downtime = item.downtime || 0;
      itemMap.set(itemName, (itemMap.get(itemName) || 0) + downtime);
    });

    // Convert to array and sort by downtime descending
    const chartData = Array.from(itemMap.entries())
      .map(([item, downtime]) => ({
        item,
        downtime: Number(downtime.toFixed(2)),
      }))
      .sort((a, b) => b.downtime - a.downtime);

    return chartData;
  };

  // Calculate dashboard metrics
  const calculateDashboardMetrics = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    // Total production this month
    const monthlyProduction = produksiNPKData
      .filter((item) => {
        const itemDate = new Date(item.tanggal);
        return (
          itemDate.getMonth() === currentMonth &&
          itemDate.getFullYear() === currentYear
        );
      })
      .reduce((sum, item) => sum + (item.total || 0), 0);

    // Total production this year
    const yearlyProduction = produksiNPKData
      .filter((item) => {
        const itemDate = new Date(item.tanggal);
        return itemDate.getFullYear() === currentYear;
      })
      .reduce((sum, item) => sum + (item.total || 0), 0);

    // Get RKAP for current month
    const monthNames = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    const currentMonthName = monthNames[currentMonth];
    const monthlyRKAP = Number(
      rkapData.find((r) => r.bulan === currentMonthName)?.targetRKAP || 0
    );

    // Total RKAP for year
    const yearlyRKAP = rkapData.reduce(
      (sum, item) => sum + (Number(item.targetRKAP) || 0),
      0
    );

    // Calculate percentages
    const monthlyPercentage =
      monthlyRKAP > 0 ? (monthlyProduction / monthlyRKAP) * 100 : 0;
    const yearlyPercentage =
      yearlyRKAP > 0 ? (yearlyProduction / yearlyRKAP) * 100 : 0;

    // Monthly breakdown
    const monthlyBreakdown = monthNames.map((month, index) => {
      const monthData = produksiNPKData.filter((item) => {
        const itemDate = new Date(item.tanggal);
        return (
          itemDate.getMonth() === index &&
          itemDate.getFullYear() === currentYear
        );
      });
      const production = monthData.reduce(
        (sum, item) => sum + (item.total || 0),
        0
      );
      const rkap = Number(
        rkapData.find((r) => r.bulan === month)?.targetRKAP || 0
      );
      const percentage = rkap > 0 ? (production / rkap) * 100 : 0;

      return {
        bulan: month.substring(0, 3),
        produksi: production,
        rkap: rkap,
        percentage: percentage,
      };
    });

    return {
      monthlyProduction,
      yearlyProduction,
      monthlyRKAP,
      yearlyRKAP,
      monthlyPercentage,
      yearlyPercentage,
      monthlyBreakdown,
    };
  };

  // Print function for Timesheet Forklift
  const handlePrintTimesheetForklift = () => {
    const [yearStr, monthStr] = printForkliftMonth.split("-");
    const year = Number(yearStr);
    const month = Number(monthStr); // 1-12

    // const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0); // last day of month

    const formatDate = (date: Date) => {
      const dd = String(date.getDate()).padStart(2, "0");
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const yyyy = date.getFullYear();
      return `${dd}/${mm}/${yyyy}`;
    };

    // const monthName = [
    //   "Januari",
    //   "Februari",
    //   "Maret",
    //   "April",
    //   "Mei",
    //   "Juni",
    //   "Juli",
    //   "Agustus",
    //   "September",
    //   "Oktober",
    //   "November",
    //   "Desember",
    // ][month - 1];

    const filtered = timesheetForkliftData.filter((item) => {
      if (item.forklift !== printForkliftUnit) return false;
      // item.tanggal diasumsikan format YYYY-MM-DD dari backend
      const [itemYear, itemMonth] = String(item.tanggal).split("-");
      return Number(itemYear) === year && Number(itemMonth) === month;
    });

    const daysInMonth = endDate.getDate();
    const rows = [] as {
      date: Date;
      record?: (typeof timesheetForkliftData)[number];
    }[];

    for (let day = 1; day <= daysInMonth; day++) {
      const current = new Date(year, month - 1, day);
      // Build YYYY-MM-DD string manually to avoid timezone issues
      const currentStr = `${year}-${String(month).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;
      const record = filtered.find((r) => r.tanggal === currentStr);
      rows.push({ date: current, record });
    }

    const totalJamOperasi = rows.reduce((sum, r) => {
      return sum + (r.record?.jamOperasi || 0);
    }, 0);

    const today = new Date();
    const todayText = formatDate(today);

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>HASIL PEMERIKSAAN FORKLIFT</title>
          <style>
            @page { size: A4 portrait; margin: 10mm; }
            body { font-family: Arial, sans-serif; font-size: 9pt; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #000; padding: 3px 4px; }
            .no-border th, .no-border td { border: none; }
            .center { text-align: center; }
            .right { text-align: right; }
            .bold { font-weight: bold; }
          </style>
        </head>
        <body>
          <table>
            <tr class="no-border">
              <td colspan="9" class="center bold">HASIL PEMERIKSAAN FORKLIFT</td>
            </tr>
            <tr class="no-border">
              <td colspan="9" class="center bold">NPK GRANULAR 2</td>
            </tr>
            <tr class="no-border"><td colspan="8"></td></tr>
            <tr class="bold">
              <td class="center" rowspan="2">TANGGAL</td>
              <td class="center" rowspan="2">UNIT</td>
              <td class="center" rowspan="2">TEMUAN</td>
              <td class="center" colspan="2">WAKTU PERBAIKAN</td>
              <td class="center">HOLDING</td>
              <td class="center">REAL</td>
              <td class="center" rowspan="2">KET</td>
            </tr>
            <tr class="bold">
              <td class="center">STOP</td>
              <td class="center">START</td>
              <td class="center">TIME</td>
              <td class="center">TIME</td>
            </tr>
            ${rows
              .map((row) => {
                const rec = row.record;
                const tanggal = formatDate(row.date);
                const temuan = rec?.deskripsiTemuan || "";
                const jamOff = rec
                  ? Number(rec.jamOff || 0).toFixed(2)
                  : "0.00";
                const jamStart = rec
                  ? Number(rec.jamStart || 0).toFixed(2)
                  : "0.00";
                // const holdingTime = rec
                //   ? Number(rec.jamGrounded || 0).toFixed(2)
                //   : "0.00";
                const realTime = rec
                  ? Number(rec.jamOperasi || 0).toFixed(2)
                  : "0.00";
                const ket = rec?.keterangan || "";
                return `
                  <tr>
                    <td>${tanggal}</td>
                    <td class="center">${printForkliftUnit}</td>
                    <td>${temuan}</td>
                    <td class="right">${jamOff}</td>
                    <td class="right">${jamStart}</td>
                    <td class="center">Jam</td>
                    <td class="right">${realTime} Jam</td>
                    <td class="center">${ket}</td>
                  </tr>
                `;
              })
              .join("")}
            <tr>
              <td colspan="5" class="right bold">HOLDING TIME</td>
              <td colspan="3" class="right">Jam</td>
            </tr>
            <tr>
              <td colspan="5" class="right bold">WORK TIME</td>
              <td colspan="3" class="right">${totalJamOperasi.toFixed(
                2
              )} Jam</td>
            </tr>
            <tr>
              <td colspan="5" class="right bold">REAL TIME</td>
              <td colspan="3" class="right">${totalJamOperasi.toFixed(
                2
              )} Jam</td>
            </tr>
            <tr class="no-border"><td colspan="8" style="height: 40px;"></td></tr>
            <tr class="no-border">
              <td colspan="8" class="right">Cikampek, ${todayText}</td>
            </tr>
            <tr class="no-border"><td colspan="8" style="height: 40px;"></td></tr>
            <tr class="no-border">
              <td colspan="8" class="right bold">AVP NPKG 2 & BLENDING</td>
            </tr>
            <tr class="no-border"><td colspan="8" style="height: 40px;"></td></tr>
            <tr class="no-border">
              <td colspan="8" class="right bold">SOEWARTONO</td>
            </tr>
            <tr class="no-border">
              <td colspan="8" class="right bold">3972109</td>
            </tr>
          </table>

          <script>
            window.onload = function() { window.print(); };
          </script>
        </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  // Print function for Timesheet Loader
  const handlePrintTimesheetLoader = () => {
    const [yearStr, monthStr] = printLoaderMonth.split("-");
    const year = Number(yearStr);
    const month = Number(monthStr);

    const formatDate = (date: Date) => {
      const dd = String(date.getDate()).padStart(2, "0");
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const yyyy = date.getFullYear();
      return `${dd}/${mm}/${yyyy}`;
    };

    // const monthName = [
    //   "Januari",
    //   "Februari",
    //   "Maret",
    //   "April",
    //   "Mei",
    //   "Juni",
    //   "Juli",
    //   "Agustus",
    //   "September",
    //   "Oktober",
    //   "November",
    //   "Desember",
    // ][month - 1];

    const filtered = timesheetLoaderData.filter((item) => {
      const [itemYear, itemMonth] = String(item.tanggal).split("-");
      return Number(itemYear) === year && Number(itemMonth) === month;
    });

    const endDate = new Date(year, month, 0);
    const daysInMonth = endDate.getDate();

    // Generate all data for entire month (no split)
    const rows: any[] = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const currentStr = `${year}-${String(month).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;
      const dayRecords = filtered.filter((r) => r.tanggal === currentStr);

      if (dayRecords.length === 0) {
        // No data - create 3 empty rows for Malam/Pagi/Sore
        const current = new Date(year, month - 1, day);
        const tanggal = formatDate(current);
        ["MALAM", "PAGI", "SORE"].forEach((shift) => {
          const jamOperasi = shift === "MALAM" ? 8 : shift === "PAGI" ? 7 : 7;
          rows.push({
            tanggal,
            shift,
            kendala: "Tidak ada temuan",
            jamOff: "00:00:00",
            jamStart: "00:00:00",
            holdingTime: "Jam",
            realTime: `${jamOperasi} Jam`,
          });
        });
      } else {
        // Has data
        dayRecords.forEach((rec) => {
          const current = new Date(rec.tanggal);
          const tanggal = formatDate(current);
          rows.push({
            tanggal,
            shift: rec.shift?.toUpperCase() || "MALAM",
            kendala: rec.deskripsiTemuan || "Tidak ada temuan",
            jamOff:
              rec.jamOff && rec.jamOff !== "0"
                ? String(rec.jamOff).padStart(8, "0")
                : "00:00:00",
            jamStart:
              rec.jamStart && rec.jamStart !== "0"
                ? String(rec.jamStart).padStart(8, "0")
                : "00:00:00",
            holdingTime: "Jam",
            realTime: `${(rec.jamOperasi || 0).toFixed(0)} Jam`,
          });
        });
      }
    }

    const totalJam = rows.reduce((sum, r) => {
      const match = r.realTime.match(/(\d+)/);
      return sum + (match ? Number(match[1]) : 0);
    }, 0);

    const today = new Date();
    const todayText = formatDate(today);

    const generateHTML = () => {
      return `
        <div>
          <table>
            <tr class="no-border">
              <td colspan="7" class="center bold" style="font-size: 11pt;">TIME SHEET LOADER SEWAAN NPK GRANUL 2</td>
            </tr>
            <tr class="no-border">
              <td colspan="7" class="center bold" style="font-size: 10pt;">PT. PUPUK KUJANG CIKAMPEK</td>
            </tr>
            <tr class="no-border"><td colspan="7" style="height: 10px;"></td></tr>
            <tr class="bold">
              <td class="center" rowspan="2">TANGGAL</td>
              <td class="center" rowspan="2">SHIFT</td>
              <td class="center" rowspan="2">KENDALA / KERUSAKAN</td>
              <td class="center" colspan="2">WAKTU PERBAIKAN</td>
              <td class="center">HOLDING</td>
              <td class="center">REAL</td>
            </tr>
            <tr class="bold">
              <td class="center">STOP</td>
              <td class="center">START</td>
              <td class="center">TIME</td>
              <td class="center">TIME</td>
            </tr>
            ${rows
              .map(
                (row: any) => `
              <tr>
                <td>${row.tanggal}</td>
                <td class="center">${row.shift}</td>
                <td>${row.kendala}</td>
                <td class="center">${row.jamOff}</td>
                <td class="center">${row.jamStart}</td>
                <td class="center">${row.holdingTime}</td>
                <td class="center">${row.realTime}</td>
              </tr>
            `
              )
              .join("")}
            <tr>
              <td colspan="5" class="right bold">HOLDING TIME</td>
              <td colspan="2" class="right">Jam</td>
            </tr>
            <tr>
              <td colspan="5" class="right bold">WORK TIME</td>
              <td colspan="2" class="right">${totalJam} Jam</td>
            </tr>
            <tr class="no-border"><td colspan="7" style="height: 20px;"></td></tr>
            <tr class="no-border">
              <td colspan="7" class="right">Cikampek, ${todayText}</td>
            </tr>
            <tr class="no-border"><td colspan="7" style="height: 40px;"></td></tr>
            <tr class="no-border">
              <td colspan="2" class="center bold">Mengetahui</td>
              <td colspan="2" class="center bold">Menyetujui</td>
              <td colspan="3" class="center bold">Pelaksana</td>
            </tr>
            <tr class="no-border">
              <td colspan="2" class="center">AVP NPKG 2 & Blending</td>
              <td colspan="2" class="center">Direktur CV. Putra Manggala</td>
              <td colspan="3"></td>
            </tr>
            <tr class="no-border"><td colspan="7" style="height: 60px;"></td></tr>
            <tr class="no-border">
              <td colspan="2" class="center bold" style="text-decoration: underline;">Soewartono</td>
              <td colspan="2" class="center bold" style="text-decoration: underline;">Isep Surherlan</td>
              <td colspan="3" class="center bold" style="text-decoration: underline; font-style: italic;">Operator Loader</td>
            </tr>
            <tr class="no-border">
              <td colspan="2" class="center">3972109</td>
              <td colspan="2" class="center">Direktur CV. Putra Manggala</td>
              <td colspan="3"></td>
            </tr>
          </table>
        </div>
      `;
    };

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>TIME SHEET LOADER</title>
          <style>
            @page { size: A4 portrait; margin: 10mm; }
            body { font-family: Arial, sans-serif; font-size: 8pt; }
            table { border-collapse: collapse; width: 100%; margin-bottom: 16px; }
            th, td { border: 1px solid #000; padding: 2px 3px; }
            .no-border th, .no-border td { border: none; }
            .center { text-align: center; }
            .right { text-align: right; }
            .bold { font-weight: bold; }
            .italic { font-style: italic; }
          </style>
        </head>
        <body>
          ${generateHTML()}
          <script>
            window.onload = function() { window.print(); };
          </script>
        </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  const metrics = calculateDashboardMetrics();

  // Print function for Gate Pass
  const handlePrintGatePass = (gateItem: any) => {
    if (!gateItem) return;
    // Format date in English long form
    let dateObj: Date | null = null;
    try {
      dateObj = new Date(gateItem.tanggal);
      if (isNaN(dateObj.getTime())) dateObj = null;
    } catch {
      dateObj = null;
    }
    const formattedDate = dateObj
      ? dateObj.toLocaleDateString("en-US", {
          weekday: "long",
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
      : gateItem.tanggal;

    // Generate gate pass content block
    const generateGatePassBlock = () => `
  <div class="gate-pass-block">
    <div class="top-row">
      <div>
        <img src="/logo.png" alt="Logo" class="logo" onerror="this.style.display='none'" />
      </div>
      <div class="header-box" style="flex:1; margin-left:16px;">
        <h1>GATE PASS</h1>
        <div class="info-lines">
          <div><strong>No.:</strong> ${gateItem.noFile || ""}</div>
          <div><strong>No. Pol:</strong> ${gateItem.noPol || ""}</div>
        </div>
      </div>
    </div>
    <table class="label-table">
      <tr>
        <td class="label">Tanggal</td><td class="colon">:</td><td colspan="4">${formattedDate}</td>
      </tr>
      <tr>
        <td class="label">Nama Pembawa</td><td class="colon">:</td><td colspan="4">${
          gateItem.namaPembawa || ""
        }</td>
      </tr>
      <tr>
        <td class="label">Pemilik Barang</td><td class="colon">:</td><td colspan="4">${
          gateItem.pemilikBarang || ""
        }</td>
      </tr>
      <tr>
        <td class="label">Nama Barang</td><td class="colon">:</td><td colspan="4">${
          gateItem.namaBarang || ""
        }</td>
      </tr>
      <tr>
        <td class="label">Alasan Mengeluarkan Barang</td><td class="colon">:</td><td colspan="4">${
          gateItem.alasanMengeluarkan || ""
        }</td>
      </tr>
      <tr>
        <td class="label">Approver</td><td class="colon">:</td><td colspan="4">${
          gateItem.approver || ""
        }</td>
      </tr>
    </table>
    <div class="signatures">
      <div class="sig-block">
        <div class="sig-title">Pembawa Barang</div>
        <div class="sig-line">${gateItem.namaPembawa || ""}</div>
      </div>
      <div class="sig-block">
        <div class="sig-title">Mengetahui / Menyetujui</div>
        <div class="sig-line">${gateItem.approver || ""}</div>
      </div>
    </div>
  </div>`;

    const html = `<!DOCTYPE html>
<html>
<head>
  <title>GATE PASS</title>
  <style>
    @page { size: A4 portrait; margin: 12mm; }
    body { font-family: Arial, sans-serif; font-size: 10pt; color:#000; margin:0; padding:0; }
    h1 { margin:0; font-size: 18pt; letter-spacing:1px; }
    .gate-pass-block { height: 48%; padding: 8px 0; }
    .header-box { border:2px solid #000; padding:10px; text-align:center; }
    .top-row { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px; }
    .logo { width:80px; height:80px; object-fit:contain; }
    .info-lines { margin-top:6px; font-size:9pt; }
    .label-table { width:100%; border-collapse:collapse; margin-bottom:16px; }
    .label-table td { padding:4px 3px; vertical-align:top; font-size:9.5pt; }
    .label { width:150px; font-weight:bold; }
    .colon { width:12px; }
    .signatures { width:100%; margin-top:20px; display:flex; justify-content:space-between; }
    .sig-block { width:45%; text-align:center; }
    .sig-title { font-weight:bold; margin-bottom:45px; font-size:9pt; }
    .sig-line { border-top:1px solid #000; padding-top:4px; font-weight:bold; font-size:9pt; }
    .cut-line { 
      position: relative;
      height: 30px; 
      border-top: 2px dashed #999; 
      margin: 10px 0;
      text-align: center;
    }
    .cut-icon {
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
      background: white;
      padding: 0 8px;
      font-size: 20px;
    }
  </style>
</head>
<body>
  <div class="cut-line">
    <span class="cut-icon">??</span>
  </div>
  ${generateGatePassBlock()}
  <div class="cut-line">
    <span class="cut-icon">??</span>
  </div>
  ${generateGatePassBlock()}
  <div class="cut-line">
    <span class="cut-icon">??</span>
  </div>
  <script>window.onload = function(){ window.print(); };</script>
</body>
</html>`;

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(html);
      printWindow.document.close();
    }
  };

  // Render Dashboard
  const renderDashboard = () => {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-[#2D6A4F] to-[#52B788] text-white shadow-lg border-none">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Produksi Bulan Ini
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {metrics.monthlyProduction.toFixed(2)} Ton
              </div>
              <p className="text-xs mt-2 opacity-90">
                Target: {metrics.monthlyRKAP} Ton
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#2D6A4F] to-[#52B788] text-white shadow-lg border-none">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Target className="w-4 h-4" />
                Pencapaian Bulanan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {metrics.monthlyPercentage.toFixed(1)}%
              </div>
              <div className="w-full bg-white/20 rounded-full h-2 mt-3">
                <div
                  className="bg-white h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(metrics.monthlyPercentage, 100)}%`,
                  }}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#1B4332] to-[#2D6A4F] text-white shadow-lg border-none">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Factory className="w-4 h-4" />
                Produksi Tahun Ini
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {metrics.yearlyProduction.toFixed(2)} Ton
              </div>
              <p className="text-xs mt-2 opacity-90">
                Target: {metrics.yearlyRKAP} Ton
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#FFD700] to-[#F4B942] text-[#1B4332] shadow-lg border-none">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                {metrics.yearlyPercentage >= 100 ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <AlertCircle className="w-4 h-4" />
                )}
                Pencapaian Tahunan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {metrics.yearlyPercentage.toFixed(1)}%
              </div>
              <div className="w-full bg-[#1B4332]/20 rounded-full h-2 mt-3">
                <div
                  className="bg-[#1B4332] h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(metrics.yearlyPercentage, 100)}%`,
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-[#2D6A4F]/30 shadow-md">
            <CardHeader className="bg-gradient-to-r from-[#2D6A4F]/10 to-[#52B788]/10 border-b border-[#2D6A4F]/20">
              <CardTitle className="text-[#1B4332]">
                Grafik Produksi vs RKAP Tahunan
              </CardTitle>
              <CardDescription>
                Perbandingan produksi dengan target RKAP per bulan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={metrics.monthlyBreakdown}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="bulan" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #2D6A4F",
                    }}
                    formatter={(value: number) => `${value.toFixed(2)} Ton`}
                  />
                  <Legend />
                  <Bar
                    dataKey="produksi"
                    name="Produksi Aktual"
                    fill="#FFD700"
                    radius={[8, 8, 0, 0]}
                  />
                  <Bar
                    dataKey="rkap"
                    name="Target RKAP"
                    fill="#2D6A4F"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-[#2D6A4F]/30 shadow-md">
            <CardHeader className="bg-gradient-to-r from-[#2D6A4F]/10 to-[#52B788]/10 border-b border-[#2D6A4F]/20">
              <CardTitle className="text-[#1B4332]">
                Persentase Pencapaian Bulanan
              </CardTitle>
              <CardDescription>
                Tracking pencapaian terhadap RKAP setiap bulan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={metrics.monthlyBreakdown}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis dataKey="bulan" stroke="#666" />
                  <YAxis stroke="#666" unit="%" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #2D6A4F",
                    }}
                    formatter={(value: number) => `${value.toFixed(1)}%`}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="percentage"
                    name="Pencapaian (%)"
                    stroke="#FFD700"
                    strokeWidth={3}
                    dot={{ fill: "#F4B942", r: 5 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="border-[#2D6A4F]/30 shadow-md">
          <CardHeader className="bg-gradient-to-r from-[#2D6A4F]/10 to-[#52B788]/10 border-b border-[#2D6A4F]/20">
            <CardTitle className="text-[#1B4332]">
              Detail Pencapaian Bulanan
            </CardTitle>
            <CardDescription>
              Rincian produksi dan pencapaian setiap bulan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#2D6A4F]/30">
                    <th className="text-left py-3 px-4 font-semibold text-[#1B4332]">
                      Bulan
                    </th>
                    <th className="text-right py-3 px-4 font-semibold text-[#1B4332]">
                      Produksi (Ton)
                    </th>
                    <th className="text-right py-3 px-4 font-semibold text-[#1B4332]">
                      Target RKAP (Ton)
                    </th>
                    <th className="text-right py-3 px-4 font-semibold text-[#1B4332]">
                      Pencapaian (%)
                    </th>
                    <th className="text-center py-3 px-4 font-semibold text-[#1B4332]">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {metrics.monthlyBreakdown.map((month, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-gray-100 hover:bg-[#2D6A4F]/5"
                    >
                      <td className="py-3 px-4 font-medium">{month.bulan}</td>
                      <td className="text-right py-3 px-4">
                        {month.produksi.toFixed(2)}
                      </td>
                      <td className="text-right py-3 px-4">
                        {month.rkap.toFixed(2)}
                      </td>
                      <td className="text-right py-3 px-4 font-semibold">
                        {month.percentage.toFixed(1)}%
                      </td>
                      <td className="text-center py-3 px-4">
                        {month.percentage >= 100 ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-[#2D6A4F]/20 text-[#1B4332]">
                            <CheckCircle className="w-3 h-3" /> Target Tercapai
                          </span>
                        ) : month.percentage >= 80 ? (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            <TrendingUp className="w-3 h-3" /> Mendekati Target
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            <AlertCircle className="w-3 h-3" /> Perlu
                            Peningkatan
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#2D6A4F]/30 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-[#2D6A4F]/10 to-[#52B788]/10 border-b border-[#2D6A4F]/20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <CardTitle className="text-[#1B4332] flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-[#2D6A4F]" />
                  Analisis Downtime Per Item
                </CardTitle>
                <CardDescription className="mt-1">
                  Monitoring waktu downtime equipment/item berdasarkan periode
                </CardDescription>
              </div>
              <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 border border-[#2D6A4F]/20 shadow-sm">
                <label className="text-sm font-semibold text-[#1B4332] whitespace-nowrap">
                  ?? Periode:
                </label>
                <input
                  type="month"
                  value={downtimeChartMonth}
                  onChange={(e) => setDowntimeChartMonth(e.target.value)}
                  className="border-none bg-transparent text-sm font-medium text-[#2D6A4F] focus:outline-none focus:ring-0 cursor-pointer"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {calculateDowntimePerItem().length > 0 ? (
              <ResponsiveContainer width="100%" height={450}>
                <BarChart
                  data={calculateDowntimePerItem()}
                  layout="vertical"
                  margin={{ top: 10, right: 40, left: 130, bottom: 10 }}
                >
                  <defs>
                    <linearGradient
                      id="downtimeGradient"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="0"
                    >
                      <stop offset="0%" stopColor="#ef4444" stopOpacity={0.9} />
                      <stop offset="100%" stopColor="#dc2626" stopOpacity={1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#e5e7eb"
                    horizontal={true}
                    vertical={false}
                  />
                  <XAxis
                    type="number"
                    stroke="#6b7280"
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                    label={{
                      value: "Total Downtime (Jam)",
                      position: "insideBottom",
                      offset: -5,
                      style: { fill: "#1B4332", fontWeight: 600, fontSize: 13 },
                    }}
                  />
                  <YAxis
                    type="category"
                    dataKey="item"
                    stroke="#6b7280"
                    width={120}
                    tick={{ fill: "#1B4332", fontSize: 12, fontWeight: 500 }}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(45, 106, 79, 0.05)" }}
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "2px solid #2D6A4F",
                      borderRadius: "12px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                      padding: "12px",
                    }}
                    labelStyle={{
                      color: "#1B4332",
                      fontWeight: 600,
                      marginBottom: 4,
                    }}
                    formatter={(value: number) => [
                      <span style={{ color: "#dc2626", fontWeight: 600 }}>
                        {value.toFixed(2)} Jam
                      </span>,
                      "Total Downtime",
                    ]}
                  />
                  <Bar
                    dataKey="downtime"
                    fill="url(#downtimeGradient)"
                    radius={[0, 12, 12, 0]}
                    animationDuration={1000}
                    animationBegin={0}
                    label={{
                      position: "right",
                      formatter: (value: number) => `${value.toFixed(1)} Jam`,
                      fill: "#1B4332",
                      fontSize: 11,
                      fontWeight: 600,
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex flex-col items-center justify-center h-[450px] text-gray-400">
                <AlertCircle className="w-16 h-16 mb-4 opacity-50" />
                <p className="text-lg font-medium">Tidak ada data downtime</p>
                <p className="text-sm">untuk periode yang dipilih</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-[#2D6A4F]/30 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="bg-gradient-to-r from-[#2D6A4F]/10 to-[#52B788]/10 border-b border-[#2D6A4F]/20">
              <CardTitle className="text-sm text-[#1B4332]">
                Total Produksi Blending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#1B4332]">
                {produksiBlendingData
                  .reduce((sum, item) => sum + (Number(item.tonase) || 0), 0)
                  .toFixed(2)}{" "}
                Ton
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {produksiBlendingData.length} transaksi
              </p>
            </CardContent>
          </Card>

          <Card className="border-[#2D6A4F]/30 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="bg-gradient-to-r from-[#2D6A4F]/10 to-[#52B788]/10 border-b border-[#2D6A4F]/20">
              <CardTitle className="text-sm text-[#1B4332]">
                Total Produksi NPK Mini
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#1B4332]">
                {produksiNPKMiniData
                  .reduce((sum, item) => sum + (Number(item.tonase) || 0), 0)
                  .toFixed(2)}{" "}
                Ton
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {produksiNPKMiniData.length} transaksi
              </p>
            </CardContent>
          </Card>

          <Card className="border-[#2D6A4F]/30 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="bg-gradient-to-r from-[#2D6A4F]/10 to-[#52B788]/10 border-b border-[#2D6A4F]/20">
              <CardTitle className="text-sm text-[#1B4332]">
                Total Downtime
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#1B4332]">
                {downtimeData
                  .reduce((sum, item) => sum + (item.downtime || 0), 0)
                  .toFixed(1)}{" "}
                Jam
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {downtimeData.length} kejadian
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  // Render content based on active navigation
  const renderContent = () => {
    if (activeNav === "home") {
      return renderDashboard();
    }

    if (activeNav === "produksi") {
      if (activeTab === "npk") {
        return (
          <Card className="border-[#2D6A4F]/30 shadow-md">
            <CardHeader className="bg-gradient-to-r from-[#2D6A4F]/10 to-[#52B788]/10 border-b border-[#2D6A4F]/20">
              <CardTitle className="text-[#1B4332]">Produksi Granul</CardTitle>
              <CardDescription>
                Data produksi NPK Granul harian per shift
              </CardDescription>
            </CardHeader>
            <CardContent className="bg-gradient-to-b from-white to-[#F8FAF7] p-6">
              <Modal
                isOpen={showForm}
                onClose={() => {
                  setShowForm(false);
                  setEditingIndex(null);
                }}
                title={
                  editingIndex !== null
                    ? "Edit Data Produksi NPK"
                    : "Tambah Data Produksi NPK"
                }
                size="xl"
              >
                <form onSubmit={handleSubmitProduksiNPK} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="tanggal">Tanggal</Label>
                      <Input
                        id="tanggal"
                        type="date"
                        value={formProduksiNPK.tanggal}
                        onChange={(e) =>
                          setFormProduksiNPK({
                            ...formProduksiNPK,
                            tanggal: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-3 text-[#1B4332]">
                      Shift Malam
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="malamOnspek">Onspek (Ton)</Label>
                        <Input
                          id="malamOnspek"
                          type="number"
                          step="0.01"
                          value={formProduksiNPK.shiftMalamOnspek}
                          onChange={(e) =>
                            setFormProduksiNPK({
                              ...formProduksiNPK,
                              shiftMalamOnspek: parseFloat(e.target.value) || 0,
                            })
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="malamOffspek">Offspek (Ton)</Label>
                        <Input
                          id="malamOffspek"
                          type="number"
                          step="0.01"
                          value={formProduksiNPK.shiftMalamOffspek}
                          onChange={(e) =>
                            setFormProduksiNPK({
                              ...formProduksiNPK,
                              shiftMalamOffspek:
                                parseFloat(e.target.value) || 0,
                            })
                          }
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-3 text-[#1B4332]">
                      Shift Pagi
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="pagiOnspek">Onspek (Ton)</Label>
                        <Input
                          id="pagiOnspek"
                          type="number"
                          step="0.01"
                          value={formProduksiNPK.shiftPagiOnspek}
                          onChange={(e) =>
                            setFormProduksiNPK({
                              ...formProduksiNPK,
                              shiftPagiOnspek: parseFloat(e.target.value) || 0,
                            })
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="pagiOffspek">Offspek (Ton)</Label>
                        <Input
                          id="pagiOffspek"
                          type="number"
                          step="0.01"
                          value={formProduksiNPK.shiftPagiOffspek}
                          onChange={(e) =>
                            setFormProduksiNPK({
                              ...formProduksiNPK,
                              shiftPagiOffspek: parseFloat(e.target.value) || 0,
                            })
                          }
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-3 text-[#1B4332]">
                      Shift Sore
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="soreOnspek">Onspek (Ton)</Label>
                        <Input
                          id="soreOnspek"
                          type="number"
                          step="0.01"
                          value={formProduksiNPK.shiftSoreOnspek}
                          onChange={(e) =>
                            setFormProduksiNPK({
                              ...formProduksiNPK,
                              shiftSoreOnspek: parseFloat(e.target.value) || 0,
                            })
                          }
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="soreOffspek">Offspek (Ton)</Label>
                        <Input
                          id="soreOffspek"
                          type="number"
                          step="0.01"
                          value={formProduksiNPK.shiftSoreOffspek}
                          onChange={(e) =>
                            setFormProduksiNPK({
                              ...formProduksiNPK,
                              shiftSoreOffspek: parseFloat(e.target.value) || 0,
                            })
                          }
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4 bg-[#2D6A4F]/10 p-4 rounded-lg">
                    <h4 className="font-semibold mb-3 text-[#1B4332]">
                      Total (Otomatis)
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label>Total Onspek</Label>
                        <Input
                          type="number"
                          value={
                            formProduksiNPK.totalOnspek?.toFixed(2) || "0.00"
                          }
                          readOnly
                          className="bg-gray-100"
                        />
                      </div>
                      <div>
                        <Label>Total Offspek</Label>
                        <Input
                          type="number"
                          value={
                            formProduksiNPK.totalOffspek?.toFixed(2) || "0.00"
                          }
                          readOnly
                          className="bg-gray-100"
                        />
                      </div>
                      <div>
                        <Label>Total Produksi</Label>
                        <Input
                          type="number"
                          value={formProduksiNPK.total?.toFixed(2) || "0.00"}
                          readOnly
                          className="bg-gray-100 font-bold"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4 border-t">
                    <Button
                      type="submit"
                      className="bg-[#2D6A4F] hover:bg-[#52B788]"
                      disabled={loading}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      {loading
                        ? "Menyimpan..."
                        : editingIndex !== null
                        ? "Update Data"
                        : "Simpan Data"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowForm(false);
                        setEditingIndex(null);
                      }}
                    >
                      Batal
                    </Button>
                  </div>
                </form>
              </Modal>

              {/* Print Modal */}
              <Modal
                isOpen={showPrintModal}
                onClose={() => setShowPrintModal(false)}
                title="Print Laporan Produksi NPK"
                size="md"
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDate">Tanggal Mulai</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={printDateRange.startDate}
                        onChange={(e) =>
                          setPrintDateRange((prev) => ({
                            ...prev,
                            startDate: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="endDate">Tanggal Akhir</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={printDateRange.endDate}
                        onChange={(e) =>
                          setPrintDateRange((prev) => ({
                            ...prev,
                            endDate: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="supervisorName">
                        Nama Supervisor Produksi
                      </Label>
                      <Input
                        id="supervisorName"
                        value={printSupervisorName}
                        onChange={(e) => setPrintSupervisorName(e.target.value)}
                        placeholder="Isi nama supervisor produksi"
                      />
                    </div>
                    <div>
                      <Label htmlFor="supervisorBadge">
                        No. Badge Supervisor
                      </Label>
                      <Input
                        id="supervisorBadge"
                        value={printSupervisorBadge}
                        onChange={(e) =>
                          setPrintSupervisorBadge(e.target.value)
                        }
                        placeholder="Isi no. badge"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4 border-t">
                    <Button
                      onClick={handlePrintNPK}
                      className="bg-[#2D6A4F] hover:bg-[#52B788]"
                    >
                      <Printer className="w-4 h-4 mr-2" />
                      Print Laporan
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowPrintModal(false)}
                    >
                      Batal
                    </Button>
                  </div>
                </div>
              </Modal>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-[#1B4332] text-lg">
                    Data Produksi NPK Granul
                  </h4>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setShowPrintModal(true)}
                      variant="outline"
                      className="border-[#2D6A4F] text-[#2D6A4F] hover:bg-[#2D6A4F] hover:text-white"
                    >
                      <Printer className="w-4 h-4 mr-2" />
                      Print Laporan
                    </Button>
                    <Button
                      onClick={() => {
                        setShowForm(true);
                        setEditingIndex(null);
                        setFormProduksiNPK({
                          tanggal: new Date().toISOString().split("T")[0],
                          shiftMalamOnspek: 0,
                          shiftMalamOffspek: 0,
                          shiftPagiOnspek: 0,
                          shiftPagiOffspek: 0,
                          shiftSoreOnspek: 0,
                          shiftSoreOffspek: 0,
                        });
                      }}
                      className="bg-[#2D6A4F] hover:bg-[#52B788]"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Tambah Data
                    </Button>
                  </div>
                </div>
                <div className="overflow-x-auto border border-[#2D6A4F]/30 rounded-lg">
                  <table className="w-full text-sm">
                    <thead className="bg-gradient-to-r from-[#2D6A4F] to-[#52B788] text-white">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold">
                          Tanggal
                        </th>
                        <th className="text-right py-3 px-4 font-semibold">
                          Shift Malam Onspek
                        </th>
                        <th className="text-right py-3 px-4 font-semibold">
                          Shift Malam Offspek
                        </th>
                        <th className="text-right py-3 px-4 font-semibold">
                          Shift Pagi Onspek
                        </th>
                        <th className="text-right py-3 px-4 font-semibold">
                          Shift Pagi Offspek
                        </th>
                        <th className="text-right py-3 px-4 font-semibold">
                          Shift Sore Onspek
                        </th>
                        <th className="text-right py-3 px-4 font-semibold">
                          Shift Sore Offspek
                        </th>
                        <th className="text-right py-3 px-4 font-semibold">
                          Total Onspek
                        </th>
                        <th className="text-right py-3 px-4 font-semibold">
                          Total Offspek
                        </th>
                        <th className="text-right py-3 px-4 font-semibold">
                          Total
                        </th>
                        <th className="text-center py-3 px-4 font-semibold">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {paginateData(
                        sortByDateDesc(produksiNPKData),
                        currentPage.produksi_npk,
                        itemsPerPage
                      ).map((item, idx) => {
                        const actualIdx = produksiNPKData.findIndex(
                          (d) =>
                            d.tanggal === item.tanggal &&
                            d.shiftMalamOnspek === item.shiftMalamOnspek &&
                            d.shiftPagiOnspek === item.shiftPagiOnspek
                        );
                        return (
                          <tr
                            key={idx}
                            className="border-b border-[#2D6A4F]/20 hover:bg-[#2D6A4F]/5 transition-colors"
                          >
                            <td className="py-3 px-4 text-gray-700">
                              {new Date(item.tanggal).toLocaleDateString(
                                "id-ID",
                                {
                                  year: "numeric",
                                  month: "2-digit",
                                  day: "2-digit",
                                }
                              )}
                            </td>
                            <td className="text-right py-3 px-4 text-gray-700">
                              {Number(item.shiftMalamOnspek || 0).toFixed(2)}
                            </td>
                            <td className="text-right py-3 px-4 text-gray-700">
                              {Number(item.shiftMalamOffspek || 0).toFixed(2)}
                            </td>
                            <td className="text-right py-3 px-4 text-gray-700">
                              {Number(item.shiftPagiOnspek || 0).toFixed(2)}
                            </td>
                            <td className="text-right py-3 px-4 text-gray-700">
                              {Number(item.shiftPagiOffspek || 0).toFixed(2)}
                            </td>
                            <td className="text-right py-3 px-4 text-gray-700">
                              {Number(item.shiftSoreOnspek || 0).toFixed(2)}
                            </td>
                            <td className="text-right py-3 px-4 text-gray-700">
                              {Number(item.shiftSoreOffspek || 0).toFixed(2)}
                            </td>
                            <td className="text-right py-3 px-4 text-gray-700 font-semibold">
                              {Number(item.totalOnspek || 0).toFixed(2)}
                            </td>
                            <td className="text-right py-3 px-4 text-gray-700 font-semibold">
                              {Number(item.totalOffspek || 0).toFixed(2)}
                            </td>
                            <td className="text-right py-3 px-4 font-bold text-[#1B4332]">
                              {Number(item.total || 0).toFixed(2)}
                            </td>
                            <td className="text-center py-3 px-4">
                              <div className="flex gap-2 justify-center">
                                {canEditDelete() && (
                                  <>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() =>
                                        handleEdit(actualIdx, "produksi_npk")
                                      }
                                      className="h-9 w-9 p-0 border-[#2D6A4F] text-[#1B4332] hover:bg-[#2D6A4F] hover:text-white"
                                    >
                                      <Edit className="w-5 h-5" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() =>
                                        handleDelete(actualIdx, "produksi_npk")
                                      }
                                      className="h-9 w-9 p-0 border-red-300 text-red-600 hover:bg-red-600 hover:text-white"
                                    >
                                      <Trash2 className="w-5 h-5" />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <Pagination
                  currentPage={currentPage.produksi_npk}
                  totalPages={getTotalPages(
                    produksiNPKData.length,
                    itemsPerPage
                  )}
                  onPageChange={(page) =>
                    handlePageChange("produksi_npk", page)
                  }
                />
              </div>
            </CardContent>
          </Card>
        );
      }

      if (activeTab === "blending") {
        return (
          <Card className="border-[#2D6A4F]/30 shadow-md">
            <CardHeader className="bg-gradient-to-r from-[#2D6A4F]/10 to-[#52B788]/10 border-b border-[#2D6A4F]/20">
              <CardTitle className="text-[#1B4332]">
                Produksi Blending
              </CardTitle>
              <CardDescription>Data produksi blending</CardDescription>
            </CardHeader>
            <CardContent className="bg-gradient-to-b from-white to-[#F8FAF7] p-6">
              {/* Print Modal Blending */}
              <Modal
                isOpen={showPrintModal && activeTab === "blending"}
                onClose={() => setShowPrintModal(false)}
                title="Print Laporan Produksi Blending (Over Sack)"
                size="md"
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDateBlending">Tanggal Mulai</Label>
                      <Input
                        id="startDateBlending"
                        type="date"
                        value={printBlendingDateRange.startDate}
                        onChange={(e) =>
                          setPrintBlendingDateRange((prev) => ({
                            ...prev,
                            startDate: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="endDateBlending">Tanggal Akhir</Label>
                      <Input
                        id="endDateBlending"
                        type="date"
                        value={printBlendingDateRange.endDate}
                        onChange={(e) =>
                          setPrintBlendingDateRange((prev) => ({
                            ...prev,
                            endDate: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="sectionHeadName">Nama Section Head</Label>
                      <Input
                        id="sectionHeadName"
                        value={printBlendingSectionHeadName}
                        onChange={(e) =>
                          setPrintBlendingSectionHeadName(e.target.value)
                        }
                        placeholder="Contoh: Yohan Triyono"
                      />
                    </div>
                    <div>
                      <Label htmlFor="sectionHeadBadge">
                        No. Badge Section Head
                      </Label>
                      <Input
                        id="sectionHeadBadge"
                        value={printBlendingSectionHeadBadge}
                        onChange={(e) =>
                          setPrintBlendingSectionHeadBadge(e.target.value)
                        }
                        placeholder="Contoh: 3052363"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 pt-4 border-t">
                    <Button
                      onClick={handlePrintBlending}
                      className="bg-[#2D6A4F] hover:bg-[#52B788]"
                    >
                      <Printer className="w-4 h-4 mr-2" />
                      Print Laporan
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowPrintModal(false)}
                    >
                      Batal
                    </Button>
                  </div>
                </div>
              </Modal>

              <Modal
                isOpen={showForm}
                onClose={() => {
                  setShowForm(false);
                  setEditingIndex(null);
                }}
                title={
                  editingIndex !== null
                    ? "Edit Data Produksi Blending"
                    : "Tambah Data Produksi Blending"
                }
                size="lg"
              >
                <form
                  onSubmit={handleSubmitProduksiBlending}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="tanggalBlending">Tanggal</Label>
                      <Input
                        id="tanggalBlending"
                        type="date"
                        value={formProduksiBlending.tanggal}
                        onChange={(e) =>
                          setFormProduksiBlending({
                            ...formProduksiBlending,
                            tanggal: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="kategori">Kategori</Label>
                      <Select
                        value={formProduksiBlending.kategori}
                        onValueChange={(value) =>
                          setFormProduksiBlending({
                            ...formProduksiBlending,
                            kategori: value,
                          })
                        }
                      >
                        <SelectTrigger id="kategori">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Fresh">Fresh</SelectItem>
                          <SelectItem value="Oversack">Oversack</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="formula">Formula</Label>
                      <Input
                        id="formula"
                        value={formProduksiBlending.formula}
                        onChange={(e) =>
                          setFormProduksiBlending({
                            ...formProduksiBlending,
                            formula: e.target.value,
                          })
                        }
                        placeholder="Contoh: NPK 15-15-15"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="tonaseBlending">Tonase</Label>
                      <Input
                        id="tonaseBlending"
                        type="number"
                        step="0.01"
                        value={
                          formProduksiBlending.tonase !== undefined &&
                          formProduksiBlending.tonase !== null
                            ? Number(formProduksiBlending.tonase).toFixed(2)
                            : ""
                        }
                        onChange={(e) => {
                          const raw = e.target.value;
                          const parsed = parseFloat(raw);
                          setFormProduksiBlending({
                            ...formProduksiBlending,
                            tonase: isNaN(parsed) ? 0 : parsed,
                          });
                        }}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      className="bg-[#2D6A4F] hover:bg-[#52B788]"
                      disabled={loading}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      {loading
                        ? "Menyimpan..."
                        : editingIndex !== null
                        ? "Update Data"
                        : "Simpan Data"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowForm(false);
                        setEditingIndex(null);
                      }}
                    >
                      Batal
                    </Button>
                  </div>
                </form>
              </Modal>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-[#1B4332] text-lg">
                    Data Produksi Blending
                  </h4>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setShowPrintModal(true)}
                      variant="outline"
                      className="border-[#2D6A4F] text-[#2D6A4F] hover:bg-[#2D6A4F] hover:text-white"
                    >
                      <Printer className="w-4 h-4 mr-2" />
                      Print Laporan
                    </Button>
                    <Button
                      onClick={() => {
                        setShowForm(true);
                        setEditingIndex(null);
                        setFormProduksiBlending({
                          tanggal: new Date().toISOString().split("T")[0],
                          kategori: "Fresh",
                          formula: "",
                          tonase: 0,
                        });
                      }}
                      className="bg-[#2D6A4F] hover:bg-[#52B788]"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Tambah Data
                    </Button>
                  </div>
                </div>
                <div className="overflow-x-auto border border-[#2D6A4F]/30 rounded-lg">
                  <table className="w-full text-sm">
                    <thead className="bg-gradient-to-r from-[#2D6A4F] to-[#52B788] text-white">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold">
                          Tanggal
                        </th>
                        <th className="text-left py-3 px-4 font-semibold">
                          Kategori
                        </th>
                        <th className="text-left py-3 px-4 font-semibold">
                          Formula
                        </th>
                        <th className="text-right py-3 px-4 font-semibold">
                          Tonase
                        </th>
                        <th className="text-center py-3 px-4 font-semibold">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {paginateData(
                        sortByDateDesc(produksiBlendingData),
                        currentPage.produksi_blending,
                        itemsPerPage
                      ).map((item, idx) => {
                        const actualIdx = produksiBlendingData.findIndex(
                          (d) =>
                            d.tanggal === item.tanggal &&
                            d.kategori === item.kategori &&
                            d.formula === item.formula &&
                            d.tonase === item.tonase
                        );
                        return (
                          <tr
                            key={idx}
                            className="border-b border-[#2D6A4F]/20 hover:bg-[#2D6A4F]/5 transition-colors"
                          >
                            <td className="py-3 px-4 text-gray-700">
                              {new Date(item.tanggal).toLocaleDateString(
                                "id-ID",
                                {
                                  year: "numeric",
                                  month: "2-digit",
                                  day: "2-digit",
                                }
                              )}
                            </td>
                            <td className="py-3 px-4 text-gray-700">
                              {item.kategori}
                            </td>
                            <td className="py-3 px-4 text-gray-700">
                              {item.formula}
                            </td>
                            <td className="text-right py-3 px-4 text-gray-700">
                              {Number(item.tonase || 0).toFixed(2)}
                            </td>
                            <td className="text-center py-3 px-4">
                              <div className="flex gap-2 justify-center">
                                {canEditDelete() && (
                                  <>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() =>
                                        handleEdit(
                                          actualIdx,
                                          "produksi_blending"
                                        )
                                      }
                                      className="h-9 w-9 p-0 border-[#2D6A4F] text-[#1B4332] hover:bg-[#2D6A4F] hover:text-white"
                                    >
                                      <Edit className="w-5 h-5" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() =>
                                        handleDelete(
                                          actualIdx,
                                          "produksi_blending"
                                        )
                                      }
                                      className="h-9 w-9 p-0 border-red-300 text-red-600 hover:bg-red-600 hover:text-white"
                                    >
                                      <Trash2 className="w-5 h-5" />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <Pagination
                  currentPage={currentPage.produksi_blending}
                  totalPages={getTotalPages(
                    produksiBlendingData.length,
                    itemsPerPage
                  )}
                  onPageChange={(page) =>
                    handlePageChange("produksi_blending", page)
                  }
                />
              </div>
            </CardContent>
          </Card>
        );
      }

      if (activeTab === "mini") {
        return (
          <Card className="border-[#2D6A4F]/30 shadow-md">
            <CardHeader className="bg-gradient-to-r from-[#2D6A4F]/10 to-[#52B788]/10 border-b border-[#2D6A4F]/20">
              <CardTitle className="text-[#1B4332]">
                Produksi NPK Mini
              </CardTitle>
              <CardDescription>Data produksi NPK mini</CardDescription>
            </CardHeader>
            <CardContent className="bg-gradient-to-b from-white to-[#F8FAF7] p-6">
              {/* Modal Print NPK Mini */}
              <Modal
                isOpen={showPrintModal && activeTab === "mini"}
                onClose={() => setShowPrintModal(false)}
                title="Print Laporan Produksi NPK Mini"
                size="md"
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Dari Tanggal</Label>
                      <Input
                        type="date"
                        value={printMiniDateRange.startDate}
                        onChange={(e) =>
                          setPrintMiniDateRange((prev) => ({
                            ...prev,
                            startDate: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <Label>Sampai Tanggal</Label>
                      <Input
                        type="date"
                        value={printMiniDateRange.endDate}
                        onChange={(e) =>
                          setPrintMiniDateRange((prev) => ({
                            ...prev,
                            endDate: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button
                      variant="outline"
                      onClick={() => setShowPrintModal(false)}
                    >
                      Batal
                    </Button>
                    <Button
                      className="bg-[#2D6A4F] hover:bg-[#52B788]"
                      onClick={() => {
                        setShowPrintModal(false);
                        handlePrintNPKMini();
                      }}
                    >
                      <Printer className="w-4 h-4 mr-2" />
                      Print Laporan
                    </Button>
                  </div>
                </div>
              </Modal>

              <Modal
                isOpen={showForm}
                onClose={() => {
                  setShowForm(false);
                  setEditingIndex(null);
                }}
                title={
                  editingIndex !== null
                    ? "Edit Data Produksi NPK Mini"
                    : "Tambah Data Produksi NPK Mini"
                }
                size="md"
              >
                <form
                  onSubmit={handleSubmitProduksiNPKMini}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="tanggalMini">Tanggal</Label>
                      <Input
                        id="tanggalMini"
                        type="date"
                        value={formProduksiNPKMini.tanggal}
                        onChange={(e) =>
                          setFormProduksiNPKMini({
                            ...formProduksiNPKMini,
                            tanggal: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="formulasi">Formulasi</Label>
                      <Input
                        id="formulasi"
                        value={formProduksiNPKMini.formulasi}
                        onChange={(e) =>
                          setFormProduksiNPKMini({
                            ...formProduksiNPKMini,
                            formulasi: e.target.value,
                          })
                        }
                        placeholder="Contoh: NPK Mini 16-16-16"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="tonaseMini">Tonase</Label>
                      <Input
                        id="tonaseMini"
                        type="number"
                        step="0.01"
                        value={
                          formProduksiNPKMini.tonase !== undefined &&
                          formProduksiNPKMini.tonase !== null
                            ? Number(formProduksiNPKMini.tonase).toFixed(2)
                            : ""
                        }
                        onChange={(e) => {
                          const raw = e.target.value;
                          const parsed = parseFloat(raw);
                          setFormProduksiNPKMini({
                            ...formProduksiNPKMini,
                            tonase: isNaN(parsed) ? 0 : parsed,
                          });
                        }}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      className="bg-[#2D6A4F] hover:bg-[#52B788]"
                      disabled={loading}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      {loading
                        ? "Menyimpan..."
                        : editingIndex !== null
                        ? "Update Data"
                        : "Simpan Data"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowForm(false);
                        setEditingIndex(null);
                      }}
                    >
                      Batal
                    </Button>
                  </div>
                </form>
              </Modal>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-[#1B4332] text-lg">
                    Data Produksi NPK Mini
                  </h4>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="border-[#2D6A4F] text-[#1B4332] hover:bg-[#2D6A4F] hover:text-white"
                      onClick={() => {
                        setShowPrintModal(true);
                        setPrintMiniDateRange({
                          startDate: new Date().toISOString().split("T")[0],
                          endDate: new Date().toISOString().split("T")[0],
                        });
                      }}
                    >
                      <Printer className="w-4 h-4 mr-2" />
                      Print Laporan
                    </Button>
                    <Button
                      onClick={() => {
                        setShowForm(true);
                        setEditingIndex(null);
                        setFormProduksiNPKMini({
                          tanggal: new Date().toISOString().split("T")[0],
                          formulasi: "",
                          tonase: 0,
                        });
                      }}
                      className="bg-[#2D6A4F] hover:bg-[#52B788]"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Tambah Data
                    </Button>
                  </div>
                </div>
                <div className="overflow-x-auto border border-[#2D6A4F]/30 rounded-lg">
                  <table className="w-full text-sm">
                    <thead className="bg-gradient-to-r from-[#2D6A4F] to-[#52B788] text-white">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold">
                          Tanggal
                        </th>
                        <th className="text-left py-3 px-4 font-semibold">
                          Formulasi
                        </th>
                        <th className="text-right py-3 px-4 font-semibold">
                          Tonase
                        </th>
                        <th className="text-center py-3 px-4 font-semibold">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      {paginateData(
                        sortByDateDesc(produksiNPKMiniData),
                        currentPage.produksi_npk_mini,
                        itemsPerPage
                      ).map((item, idx) => {
                        const actualIdx = produksiNPKMiniData.findIndex(
                          (d) =>
                            d.tanggal === item.tanggal &&
                            d.formulasi === item.formulasi &&
                            d.tonase === item.tonase
                        );
                        return (
                          <tr
                            key={idx}
                            className="border-b border-[#2D6A4F]/20 hover:bg-[#2D6A4F]/5 transition-colors"
                          >
                            <td className="py-3 px-4 text-gray-700">
                              {new Date(item.tanggal).toLocaleDateString(
                                "id-ID",
                                {
                                  year: "numeric",
                                  month: "2-digit",
                                  day: "2-digit",
                                }
                              )}
                            </td>
                            <td className="py-3 px-4 text-gray-700">
                              {item.formulasi}
                            </td>
                            <td className="text-right py-3 px-4 text-gray-700">
                              {Number(item.tonase || 0).toFixed(2)}
                            </td>
                            <td className="text-center py-3 px-4">
                              <div className="flex gap-2 justify-center">
                                {canEditDelete() && (
                                  <>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() =>
                                        handleEdit(
                                          actualIdx,
                                          "produksi_npk_mini"
                                        )
                                      }
                                      className="h-9 w-9 p-0 border-[#2D6A4F] text-[#1B4332] hover:bg-[#2D6A4F] hover:text-white"
                                    >
                                      <Edit className="w-5 h-5" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() =>
                                        handleDelete(
                                          actualIdx,
                                          "produksi_npk_mini"
                                        )
                                      }
                                      className="h-9 w-9 p-0 border-red-300 text-red-600 hover:bg-red-600 hover:text-white"
                                    >
                                      <Trash2 className="w-5 h-5" />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <Pagination
                  currentPage={currentPage.produksi_npk_mini}
                  totalPages={getTotalPages(
                    produksiNPKMiniData.length,
                    itemsPerPage
                  )}
                  onPageChange={(page) =>
                    handlePageChange("produksi_npk_mini", page)
                  }
                />
              </div>
            </CardContent>
          </Card>
        );
      }
    }

    if (activeNav === "laporan") {
      if (activeTab === "forklift") {
        return (
          <Card className="border-[#2D6A4F]/30 shadow-md">
            <CardHeader className="bg-gradient-to-r from-[#2D6A4F]/10 to-[#52B788]/10 border-b border-[#2D6A4F]/20">
              <CardTitle className="text-[#1B4332]">
                Timesheet Forklift
              </CardTitle>
              <CardDescription>
                Input timesheet dan tracking downtime forklift
              </CardDescription>
            </CardHeader>
            <CardContent className="bg-gradient-to-b from-white to-[#F8FAF7] p-6">
              {/* Modal Print Timesheet Forklift */}
              <Modal
                isOpen={showPrintModal}
                onClose={() => setShowPrintModal(false)}
                title="Print Hasil Pemeriksaan Forklift"
                size="md"
              >
                <div className="space-y-4">
                  <div>
                    <Label>Pilih Bulan</Label>
                    <Input
                      type="month"
                      value={printForkliftMonth}
                      onChange={(e) => setPrintForkliftMonth(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Pilih Forklift</Label>
                    <Select
                      value={printForkliftUnit}
                      onValueChange={(value) => setPrintForkliftUnit(value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="F19">F19</SelectItem>
                        <SelectItem value="F20">F20</SelectItem>
                        <SelectItem value="F21">F21</SelectItem>
                        <SelectItem value="F22">F22</SelectItem>
                        <SelectItem value="F23">F23</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button
                      variant="outline"
                      onClick={() => setShowPrintModal(false)}
                    >
                      Batal
                    </Button>
                    <Button
                      className="bg-[#2D6A4F] hover:bg-[#52B788]"
                      onClick={() => {
                        setShowPrintModal(false);
                        handlePrintTimesheetForklift();
                      }}
                    >
                      <Printer className="w-4 h-4 mr-2" />
                      Print Laporan
                    </Button>
                  </div>
                </div>
              </Modal>

              <Modal
                isOpen={showForm}
                onClose={() => {
                  setShowForm(false);
                  setEditingIndex(null);
                }}
                title={
                  editingIndex !== null
                    ? "Edit Data Timesheet Forklift"
                    : "Tambah Data Timesheet Forklift"
                }
                size="lg"
              >
                <form
                  onSubmit={handleSubmitTimesheetForklift}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="tanggalForklift">Tanggal</Label>
                      <Input
                        id="tanggalForklift"
                        type="date"
                        value={formTimesheetForklift.tanggal}
                        onChange={(e) =>
                          setFormTimesheetForklift({
                            ...formTimesheetForklift,
                            tanggal: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="forklift">Forklift</Label>
                      <Select
                        value={formTimesheetForklift.forklift}
                        onValueChange={(value) =>
                          setFormTimesheetForklift({
                            ...formTimesheetForklift,
                            forklift: value,
                          })
                        }
                      >
                        <SelectTrigger id="forklift">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="F19">F19</SelectItem>
                          <SelectItem value="F20">F20</SelectItem>
                          <SelectItem value="F21">F21</SelectItem>
                          <SelectItem value="F22">F22</SelectItem>
                          <SelectItem value="F23">F23</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="deskripsiTemuanForklift">
                        Deskripsi Temuan
                      </Label>
                      <Input
                        id="deskripsiTemuanForklift"
                        value={formTimesheetForklift.deskripsiTemuan}
                        onChange={(e) =>
                          setFormTimesheetForklift({
                            ...formTimesheetForklift,
                            deskripsiTemuan: e.target.value,
                          })
                        }
                        placeholder="Deskripsi masalah atau temuan"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="jamOffForklift">Jam Off</Label>
                      <Input
                        id="jamOffForklift"
                        type="number"
                        step="0.1"
                        value={formTimesheetForklift.jamOff}
                        onChange={(e) =>
                          setFormTimesheetForklift({
                            ...formTimesheetForklift,
                            jamOff: e.target.value,
                          })
                        }
                        placeholder="Contoh: 8.5"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="jamStartForklift">Jam Start</Label>
                      <Input
                        id="jamStartForklift"
                        type="number"
                        step="0.1"
                        value={formTimesheetForklift.jamStart}
                        onChange={(e) =>
                          setFormTimesheetForklift({
                            ...formTimesheetForklift,
                            jamStart: e.target.value,
                          })
                        }
                        placeholder="Contoh: 10.5"
                        required
                      />
                    </div>
                  </div>

                  <div className="border-t pt-4 bg-[#2D6A4F]/10 p-4 rounded-lg">
                    <h4 className="font-semibold mb-3 text-[#1B4332]">
                      Kalkulasi Otomatis
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label>Jam Grounded</Label>
                        <Input
                          type="number"
                          value={
                            formTimesheetForklift.jamGrounded?.toFixed(1) ||
                            "0.0"
                          }
                          readOnly
                          className="bg-gray-100"
                        />
                      </div>
                      <div>
                        <Label>Jam Operasi</Label>
                        <Input
                          type="number"
                          value={
                            formTimesheetForklift.jamOperasi?.toFixed(1) ||
                            "0.0"
                          }
                          readOnly
                          className="bg-gray-100"
                        />
                      </div>
                      <div>
                        <Label>Keterangan</Label>
                        <Input
                          type="text"
                          value={formTimesheetForklift.keterangan || "-"}
                          readOnly
                          className={`font-semibold ${
                            formTimesheetForklift.keterangan === "Grounded"
                              ? "bg-red-100"
                              : "bg-green-100"
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      className="bg-[#2D6A4F] hover:bg-[#52B788]"
                      disabled={loading}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      {loading
                        ? "Menyimpan..."
                        : editingIndex !== null
                        ? "Update Data"
                        : "Simpan Data"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowForm(false);
                        setEditingIndex(null);
                      }}
                    >
                      Batal
                    </Button>
                  </div>
                </form>
              </Modal>

              <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-[#1B4332]">
                    Data Timesheet Forklift
                  </h4>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="border-[#2D6A4F] text-[#1B4332] hover:bg-[#2D6A4F] hover:text-white"
                      onClick={() => {
                        setShowPrintModal(true);
                      }}
                    >
                      <Printer className="w-4 h-4 mr-2" />
                      Print Laporan
                    </Button>
                    <Button
                      onClick={() => {
                        setShowForm(true);
                        setEditingIndex(null);
                        setFormTimesheetForklift({
                          tanggal: new Date().toISOString().split("T")[0],
                          forklift: "F19",
                          deskripsiTemuan: "",
                          jamOff: "",
                          jamStart: "",
                        });
                      }}
                      className="bg-[#2D6A4F] hover:bg-[#52B788]"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Tambah Data
                    </Button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-[#2D6A4F]/20">
                      <tr>
                        <th className="text-left py-2 px-3">Tanggal</th>
                        <th className="text-left py-2 px-3">Forklift</th>
                        <th className="text-left py-2 px-3">Deskripsi</th>
                        <th className="text-right py-2 px-3">Jam Off</th>
                        <th className="text-right py-2 px-3">Jam Start</th>
                        <th className="text-right py-2 px-3">Jam Grounded</th>
                        <th className="text-right py-2 px-3">Jam Operasi</th>
                        <th className="text-center py-2 px-3">Status</th>
                        <th className="text-center py-2 px-3">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginateData(
                        sortByDateDesc(timesheetForkliftData),
                        currentPage.timesheet_forklift,
                        itemsPerPage
                      ).map((item, idx) => {
                        const actualIdx = sortByDateDesc(
                          timesheetForkliftData
                        ).indexOf(item);
                        return (
                          <tr key={idx} className="border-b hover:bg-gray-50">
                            <td className="py-2 px-3">
                              {new Date(item.tanggal).toLocaleDateString(
                                "id-ID",
                                {
                                  year: "numeric",
                                  month: "2-digit",
                                  day: "2-digit",
                                }
                              )}
                            </td>
                            <td className="py-2 px-3">{item.forklift}</td>
                            <td className="py-2 px-3">
                              {item.deskripsiTemuan}
                            </td>
                            <td className="text-right py-2 px-3">
                              {item.jamOff}
                            </td>
                            <td className="text-right py-2 px-3">
                              {item.jamStart}
                            </td>
                            <td className="text-right py-2 px-3">
                              {item.jamGrounded?.toFixed(1)}
                            </td>
                            <td className="text-right py-2 px-3">
                              {item.jamOperasi?.toFixed(1)}
                            </td>
                            <td className="text-center py-2 px-3">
                              <span
                                className={`px-2 py-1 rounded text-xs font-medium ${
                                  item.keterangan === "Grounded"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-green-100 text-green-800"
                                }`}
                              >
                                {item.keterangan}
                              </span>
                            </td>
                            <td className="text-center py-2 px-3">
                              <div className="flex gap-2 justify-center">
                                {canEditDelete() && (
                                  <>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() =>
                                        handleEdit(
                                          actualIdx,
                                          "timesheet_forklift"
                                        )
                                      }
                                      className="h-9 w-9 p-0 border-[#2D6A4F] text-[#1B4332] hover:bg-[#2D6A4F] hover:text-white"
                                    >
                                      <Edit className="w-5 h-5" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() =>
                                        handleDelete(
                                          actualIdx,
                                          "timesheet_forklift"
                                        )
                                      }
                                      className="h-9 w-9 p-0 border-red-300 text-red-600 hover:bg-red-600 hover:text-white"
                                    >
                                      <Trash2 className="w-5 h-5" />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <Pagination
                  currentPage={currentPage.timesheet_forklift}
                  totalPages={getTotalPages(
                    timesheetForkliftData.length,
                    itemsPerPage
                  )}
                  onPageChange={(page) =>
                    handlePageChange("timesheet_forklift", page)
                  }
                />
              </div>
            </CardContent>
          </Card>
        );
      }

      if (activeTab === "loader") {
        return (
          <Card className="border-[#2D6A4F]/30 shadow-md">
            <CardHeader className="bg-gradient-to-r from-[#2D6A4F]/10 to-[#52B788]/10 border-b border-[#2D6A4F]/20">
              <CardTitle className="text-[#1B4332]">Timesheet Loader</CardTitle>
              <CardDescription>
                Input timesheet dan tracking downtime loader per shift
              </CardDescription>
            </CardHeader>
            <CardContent className="bg-gradient-to-b from-white to-[#F8FAF7] p-6">
              {/* Modal Print Timesheet Loader */}
              <Modal
                isOpen={showPrintModal}
                onClose={() => setShowPrintModal(false)}
                title="Print Time Sheet Loader"
                size="md"
              >
                <div className="space-y-4">
                  <div>
                    <Label>Pilih Bulan</Label>
                    <Input
                      type="month"
                      value={printLoaderMonth}
                      onChange={(e) => setPrintLoaderMonth(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button
                      variant="outline"
                      onClick={() => setShowPrintModal(false)}
                    >
                      Batal
                    </Button>
                    <Button
                      className="bg-[#2D6A4F] hover:bg-[#52B788]"
                      onClick={() => {
                        setShowPrintModal(false);
                        handlePrintTimesheetLoader();
                      }}
                    >
                      <Printer className="w-4 h-4 mr-2" />
                      Print Laporan
                    </Button>
                  </div>
                </div>
              </Modal>

              <Modal
                isOpen={showForm}
                onClose={() => {
                  setShowForm(false);
                  setEditingIndex(null);
                }}
                title={
                  editingIndex !== null
                    ? "Edit Data Timesheet Loader"
                    : "Tambah Data Timesheet Loader"
                }
                size="lg"
              >
                <form
                  onSubmit={handleSubmitTimesheetLoader}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="tanggalLoader">Tanggal</Label>
                      <Input
                        id="tanggalLoader"
                        type="date"
                        value={formTimesheetLoader.tanggal}
                        onChange={(e) =>
                          setFormTimesheetLoader({
                            ...formTimesheetLoader,
                            tanggal: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="shiftLoader">Shift</Label>
                      <Select
                        value={formTimesheetLoader.shift}
                        onValueChange={(value) =>
                          setFormTimesheetLoader({
                            ...formTimesheetLoader,
                            shift: value,
                          })
                        }
                      >
                        <SelectTrigger id="shiftLoader">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Malam">Malam</SelectItem>
                          <SelectItem value="Pagi">Pagi</SelectItem>
                          <SelectItem value="Sore">Sore</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="deskripsiTemuanLoader">
                        Deskripsi Temuan
                      </Label>
                      <Input
                        id="deskripsiTemuanLoader"
                        value={formTimesheetLoader.deskripsiTemuan}
                        onChange={(e) =>
                          setFormTimesheetLoader({
                            ...formTimesheetLoader,
                            deskripsiTemuan: e.target.value,
                          })
                        }
                        placeholder="Deskripsi masalah atau temuan"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="jamOffLoader">Jam Off</Label>
                      <Input
                        id="jamOffLoader"
                        type="number"
                        step="0.1"
                        value={formTimesheetLoader.jamOff}
                        onChange={(e) =>
                          setFormTimesheetLoader({
                            ...formTimesheetLoader,
                            jamOff: e.target.value,
                          })
                        }
                        placeholder="Contoh: 8.5"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="jamStartLoader">Jam Start</Label>
                      <Input
                        id="jamStartLoader"
                        type="number"
                        step="0.1"
                        value={formTimesheetLoader.jamStart}
                        onChange={(e) =>
                          setFormTimesheetLoader({
                            ...formTimesheetLoader,
                            jamStart: e.target.value,
                          })
                        }
                        placeholder="Contoh: 10.5"
                        required
                      />
                    </div>
                  </div>

                  <div className="border-t pt-4 bg-[#2D6A4F]/10 p-4 rounded-lg">
                    <h4 className="font-semibold mb-3 text-[#1B4332]">
                      Kalkulasi Otomatis
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label>Jam Grounded</Label>
                        <Input
                          type="number"
                          value={
                            formTimesheetLoader.jamGrounded?.toFixed(1) || "0.0"
                          }
                          readOnly
                          className="bg-gray-100"
                        />
                      </div>
                      <div>
                        <Label>Jam Operasi</Label>
                        <Input
                          type="number"
                          value={
                            formTimesheetLoader.jamOperasi?.toFixed(1) || "0.0"
                          }
                          readOnly
                          className="bg-gray-100"
                        />
                      </div>
                      <div>
                        <Label>Keterangan</Label>
                        <Input
                          type="text"
                          value={formTimesheetLoader.keterangan || "-"}
                          readOnly
                          className={`font-semibold ${
                            formTimesheetLoader.keterangan === "Grounded"
                              ? "bg-red-100"
                              : "bg-green-100"
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      className="bg-[#2D6A4F] hover:bg-[#52B788]"
                      disabled={loading}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      {loading
                        ? "Menyimpan..."
                        : editingIndex !== null
                        ? "Update Data"
                        : "Simpan Data"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowForm(false);
                        setEditingIndex(null);
                      }}
                    >
                      Batal
                    </Button>
                  </div>
                </form>
              </Modal>

              <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-[#1B4332]">
                    Data Timesheet Loader
                  </h4>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="border-[#2D6A4F] text-[#1B4332] hover:bg-[#2D6A4F] hover:text-white"
                      onClick={() => {
                        setShowPrintModal(true);
                      }}
                    >
                      <Printer className="w-4 h-4 mr-2" />
                      Print Laporan
                    </Button>
                    <Button
                      onClick={() => {
                        setShowForm(true);
                        setEditingIndex(null);
                        setFormTimesheetLoader({
                          tanggal: new Date().toISOString().split("T")[0],
                          shift: "Malam",
                          deskripsiTemuan: "",
                          jamOff: "",
                          jamStart: "",
                        });
                      }}
                      className="bg-[#2D6A4F] hover:bg-[#52B788]"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Tambah Data
                    </Button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-[#2D6A4F]/20">
                      <tr>
                        <th className="text-left py-2 px-3">Tanggal</th>
                        <th className="text-left py-2 px-3">Shift</th>
                        <th className="text-left py-2 px-3">Deskripsi</th>
                        <th className="text-right py-2 px-3">Jam Off</th>
                        <th className="text-right py-2 px-3">Jam Start</th>
                        <th className="text-right py-2 px-3">Jam Grounded</th>
                        <th className="text-right py-2 px-3">Jam Operasi</th>
                        <th className="text-center py-2 px-3">Status</th>
                        <th className="text-center py-2 px-3">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginateData(
                        sortByDateDesc(timesheetLoaderData),
                        currentPage.timesheet_loader,
                        itemsPerPage
                      ).map((item, idx) => {
                        const actualIdx =
                          sortByDateDesc(timesheetLoaderData).indexOf(item);
                        return (
                          <tr key={idx} className="border-b hover:bg-gray-50">
                            <td className="py-2 px-3">
                              {new Date(item.tanggal).toLocaleDateString(
                                "id-ID",
                                {
                                  year: "numeric",
                                  month: "2-digit",
                                  day: "2-digit",
                                }
                              )}
                            </td>
                            <td className="py-2 px-3">{item.shift}</td>
                            <td className="py-2 px-3">
                              {item.deskripsiTemuan}
                            </td>
                            <td className="text-right py-2 px-3">
                              {item.jamOff}
                            </td>
                            <td className="text-right py-2 px-3">
                              {item.jamStart}
                            </td>
                            <td className="text-right py-2 px-3">
                              {item.jamGrounded?.toFixed(1)}
                            </td>
                            <td className="text-right py-2 px-3">
                              {item.jamOperasi?.toFixed(1)}
                            </td>
                            <td className="text-center py-2 px-3">
                              <span
                                className={`px-2 py-1 rounded text-xs font-medium ${
                                  item.keterangan === "Grounded"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-green-100 text-green-800"
                                }`}
                              >
                                {item.keterangan}
                              </span>
                            </td>
                            <td className="text-center py-2 px-3">
                              <div className="flex gap-2 justify-center">
                                {canEditDelete() && (
                                  <>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() =>
                                        handleEdit(
                                          actualIdx,
                                          "timesheet_loader"
                                        )
                                      }
                                      className="h-9 w-9 p-0 border-[#2D6A4F] text-[#1B4332] hover:bg-[#2D6A4F] hover:text-white"
                                    >
                                      <Edit className="w-5 h-5" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() =>
                                        handleDelete(
                                          actualIdx,
                                          "timesheet_loader"
                                        )
                                      }
                                      className="h-9 w-9 p-0 border-red-300 text-red-600 hover:bg-red-600 hover:text-white"
                                    >
                                      <Trash2 className="w-5 h-5" />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <Pagination
                  currentPage={currentPage.timesheet_loader}
                  totalPages={getTotalPages(
                    timesheetLoaderData.length,
                    itemsPerPage
                  )}
                  onPageChange={(page) =>
                    handlePageChange("timesheet_loader", page)
                  }
                />
              </div>
            </CardContent>
          </Card>
        );
      }

      if (activeTab === "downtime") {
        return (
          <Card className="border-[#2D6A4F]/30 shadow-md">
            <CardHeader className="bg-gradient-to-r from-[#2D6A4F]/10 to-[#52B788]/10 border-b border-[#2D6A4F]/20">
              <CardTitle className="text-[#1B4332]">Downtime</CardTitle>
              <CardDescription>Input data downtime peralatan</CardDescription>
            </CardHeader>
            <CardContent className="bg-gradient-to-b from-white to-[#F8FAF7] p-6">
              <Modal
                isOpen={showForm}
                onClose={() => {
                  setShowForm(false);
                  setEditingIndex(null);
                }}
                title={
                  editingIndex !== null
                    ? "Edit Data Downtime"
                    : "Tambah Data Downtime"
                }
                size="lg"
              >
                <form onSubmit={handleSubmitDowntime} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="tanggalDowntime">Tanggal</Label>
                      <Input
                        id="tanggalDowntime"
                        type="date"
                        value={formDowntime.tanggal}
                        onChange={(e) =>
                          setFormDowntime({
                            ...formDowntime,
                            tanggal: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="itemDowntime">Item</Label>
                      <Input
                        id="itemDowntime"
                        value={formDowntime.item}
                        onChange={(e) =>
                          setFormDowntime({
                            ...formDowntime,
                            item: e.target.value,
                          })
                        }
                        placeholder="Nama peralatan"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="deskripsiDowntime">
                        Deskripsi/Kendala
                      </Label>
                      <Input
                        id="deskripsiDowntime"
                        value={formDowntime.deskripsi}
                        onChange={(e) =>
                          setFormDowntime({
                            ...formDowntime,
                            deskripsi: e.target.value,
                          })
                        }
                        placeholder="Deskripsi masalah atau kendala"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="jamOffDowntime">Jam Off</Label>
                      <Input
                        id="jamOffDowntime"
                        type="time"
                        value={formDowntime.jamOff}
                        onChange={(e) =>
                          setFormDowntime({
                            ...formDowntime,
                            jamOff: e.target.value,
                          })
                        }
                        placeholder="Contoh: 08:00"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="jamStartDowntime">Jam Start</Label>
                      <Input
                        id="jamStartDowntime"
                        type="time"
                        value={formDowntime.jamStart}
                        onChange={(e) =>
                          setFormDowntime({
                            ...formDowntime,
                            jamStart: e.target.value,
                          })
                        }
                        placeholder="Contoh: 10:00"
                        required
                      />
                    </div>
                  </div>

                  <div className="border-t pt-4 bg-[#2D6A4F]/10 p-4 rounded-lg">
                    <h4 className="font-semibold mb-3 text-[#1B4332]">
                      Kalkulasi Otomatis
                    </h4>
                    <div>
                      <Label>Downtime (Jam)</Label>
                      <Input
                        type="number"
                        value={formDowntime.downtime?.toFixed(1) || "0.0"}
                        readOnly
                        className="bg-gray-100 font-bold"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      className="bg-[#2D6A4F] hover:bg-[#52B788]"
                      disabled={loading}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      {loading
                        ? "Menyimpan..."
                        : editingIndex !== null
                        ? "Update Data"
                        : "Simpan Data"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowForm(false);
                        setEditingIndex(null);
                      }}
                    >
                      Batal
                    </Button>
                  </div>
                </form>
              </Modal>

              <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-[#1B4332]">
                    Data Downtime
                  </h4>
                  <Button
                    onClick={() => {
                      setShowForm(true);
                      setEditingIndex(null);
                      setFormDowntime({
                        tanggal: new Date().toISOString().split("T")[0],
                        item: "",
                        deskripsi: "",
                        jamOff: "",
                        jamStart: "",
                      });
                    }}
                    className="bg-[#2D6A4F] hover:bg-[#52B788]"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Data
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-[#2D6A4F]/20">
                      <tr>
                        <th className="text-left py-2 px-3">Tanggal</th>
                        <th className="text-left py-2 px-3">Item</th>
                        <th className="text-left py-2 px-3">Deskripsi</th>
                        <th className="text-right py-2 px-3">Jam Off</th>
                        <th className="text-right py-2 px-3">Jam Start</th>
                        <th className="text-right py-2 px-3">Downtime</th>
                        <th className="text-center py-2 px-3">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginateData(
                        sortByDateDesc(downtimeData),
                        currentPage.downtime,
                        itemsPerPage
                      ).map((item, idx) => {
                        const actualIdx =
                          sortByDateDesc(downtimeData).indexOf(item);
                        return (
                          <tr key={idx} className="border-b hover:bg-gray-50">
                            <td className="py-2 px-3">
                              {new Date(item.tanggal).toLocaleDateString(
                                "id-ID",
                                {
                                  year: "numeric",
                                  month: "2-digit",
                                  day: "2-digit",
                                }
                              )}
                            </td>
                            <td className="py-2 px-3">{item.item}</td>
                            <td className="py-2 px-3">{item.deskripsi}</td>
                            <td className="text-right py-2 px-3">
                              {item.jamOff}
                            </td>
                            <td className="text-right py-2 px-3">
                              {item.jamStart}
                            </td>
                            <td className="text-right py-2 px-3 font-semibold">
                              {item.downtime?.toFixed(1)} jam
                            </td>
                            <td className="text-center py-2 px-3">
                              <div className="flex gap-2 justify-center">
                                {canEditDelete() && (
                                  <>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() =>
                                        handleEdit(actualIdx, "downtime")
                                      }
                                      className="h-9 w-9 p-0 border-[#2D6A4F] text-[#1B4332] hover:bg-[#2D6A4F] hover:text-white"
                                    >
                                      <Edit className="w-5 h-5" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() =>
                                        handleDelete(
                                          actualIdx,
                                          "downtime",
                                          item
                                        )
                                      }
                                      className="h-9 w-9 p-0 border-red-300 text-red-600 hover:bg-red-600 hover:text-white"
                                    >
                                      <Trash2 className="w-5 h-5" />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <Pagination
                  currentPage={currentPage.downtime}
                  totalPages={getTotalPages(downtimeData.length, itemsPerPage)}
                  onPageChange={(page) => handlePageChange("downtime", page)}
                />
              </div>
            </CardContent>
          </Card>
        );
      }
    }

    if (activeNav === "data") {
      if (activeTab === "workrequest") {
        return (
          <Card className="border-[#2D6A4F]/30 shadow-md">
            <CardHeader className="bg-gradient-to-r from-[#2D6A4F]/10 to-[#52B788]/10 border-b border-[#2D6A4F]/20">
              <CardTitle className="text-[#1B4332]">Work Request</CardTitle>
              <CardDescription>
                Input data work request pekerjaan
              </CardDescription>
            </CardHeader>
            <CardContent className="bg-gradient-to-b from-white to-[#F8FAF7] p-6">
              <Modal
                isOpen={showForm}
                onClose={() => {
                  setShowForm(false);
                  setEditingIndex(null);
                }}
                title={
                  editingIndex !== null
                    ? "Edit Data Work Request"
                    : "Tambah Data Work Request"
                }
                size="lg"
              >
                <form onSubmit={handleSubmitWorkRequest} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="tanggalWR">Tanggal</Label>
                      <Input
                        id="tanggalWR"
                        type="date"
                        value={formWorkRequest.tanggal}
                        onChange={(e) =>
                          setFormWorkRequest({
                            ...formWorkRequest,
                            tanggal: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="nomorWR">Nomor Work Request</Label>
                      <Input
                        id="nomorWR"
                        value={formWorkRequest.nomorWR}
                        onChange={(e) =>
                          setFormWorkRequest({
                            ...formWorkRequest,
                            nomorWR: e.target.value,
                          })
                        }
                        placeholder="Contoh: WR-2025-001"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="itemWR">Item</Label>
                      <Input
                        id="itemWR"
                        value={formWorkRequest.item}
                        onChange={(e) =>
                          setFormWorkRequest({
                            ...formWorkRequest,
                            item: e.target.value,
                          })
                        }
                        placeholder="Nama item/peralatan"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="areaWR">Area</Label>
                      <Input
                        id="areaWR"
                        value={formWorkRequest.area}
                        onChange={(e) =>
                          setFormWorkRequest({
                            ...formWorkRequest,
                            area: e.target.value,
                          })
                        }
                        placeholder="Lokasi area kerja"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="eksekutorWR">Eksekutor</Label>
                      <Input
                        id="eksekutorWR"
                        value={formWorkRequest.eksekutor}
                        onChange={(e) =>
                          setFormWorkRequest({
                            ...formWorkRequest,
                            eksekutor: e.target.value,
                          })
                        }
                        placeholder="Nama eksekutor"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="includeWR">Include</Label>
                      <Input
                        id="includeWR"
                        value={formWorkRequest.include}
                        onChange={(e) =>
                          setFormWorkRequest({
                            ...formWorkRequest,
                            include: e.target.value,
                          })
                        }
                        placeholder="Yang termasuk dalam pekerjaan"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="deskripsiPekerjaan">
                        Deskripsi Pekerjaan
                      </Label>
                      <Input
                        id="deskripsiPekerjaan"
                        value={formWorkRequest.deskripsiPekerjaan}
                        onChange={(e) =>
                          setFormWorkRequest({
                            ...formWorkRequest,
                            deskripsiPekerjaan: e.target.value,
                          })
                        }
                        placeholder="Detail pekerjaan yang akan dilakukan"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      className="bg-[#2D6A4F] hover:bg-[#52B788]"
                      disabled={loading}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      {loading
                        ? "Menyimpan..."
                        : editingIndex !== null
                        ? "Update Data"
                        : "Simpan Data"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowForm(false);
                        setEditingIndex(null);
                      }}
                    >
                      Batal
                    </Button>
                  </div>
                </form>
              </Modal>

              <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-[#1B4332]">
                    Data Work Request
                  </h4>
                  <Button
                    onClick={() => {
                      setShowForm(true);
                      setEditingIndex(null);
                      setFormWorkRequest({
                        tanggal: new Date().toISOString().split("T")[0],
                        nomorWR: "",
                        item: "",
                        area: "",
                        eksekutor: "",
                        include: "",
                        deskripsiPekerjaan: "",
                      });
                    }}
                    className="bg-[#2D6A4F] hover:bg-[#52B788]"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Data
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-[#2D6A4F]/20">
                      <tr>
                        <th className="text-left py-2 px-3">Tanggal</th>
                        <th className="text-left py-2 px-3">No. WR</th>
                        <th className="text-left py-2 px-3">Item</th>
                        <th className="text-left py-2 px-3">Area</th>
                        <th className="text-left py-2 px-3">Eksekutor</th>
                        <th className="text-left py-2 px-3">Include</th>
                        <th className="text-left py-2 px-3">
                          Deskripsi Pekerjaan
                        </th>
                        <th className="text-center py-2 px-3">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginateData(
                        sortByDateDesc(workRequestData),
                        currentPage.work_request,
                        itemsPerPage
                      ).map((item, idx) => {
                        const actualIdx =
                          sortByDateDesc(workRequestData).indexOf(item);
                        return (
                          <tr key={idx} className="border-b hover:bg-gray-50">
                            <td className="py-2 px-3">
                              {new Date(item.tanggal).toLocaleDateString(
                                "id-ID",
                                {
                                  year: "numeric",
                                  month: "2-digit",
                                  day: "2-digit",
                                }
                              )}
                            </td>
                            <td className="py-2 px-3">{item.nomorWR}</td>
                            <td className="py-2 px-3">{item.item}</td>
                            <td className="py-2 px-3">{item.area}</td>
                            <td className="py-2 px-3">{item.eksekutor}</td>
                            <td className="py-2 px-3">{item.include}</td>
                            <td className="py-2 px-3">
                              {item.deskripsiPekerjaan}
                            </td>
                            <td className="text-center py-2 px-3">
                              <div className="flex gap-2 justify-center">
                                {canEditDelete() && (
                                  <>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() =>
                                        handleEdit(actualIdx, "work_request")
                                      }
                                      className="h-9 w-9 p-0 border-[#2D6A4F] text-[#1B4332] hover:bg-[#2D6A4F] hover:text-white"
                                    >
                                      <Edit className="w-5 h-5" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() =>
                                        handleDelete(
                                          actualIdx,
                                          "work_request",
                                          item
                                        )
                                      }
                                      className="h-9 w-9 p-0 border-red-300 text-red-600 hover:bg-red-600 hover:text-white"
                                    >
                                      <Trash2 className="w-5 h-5" />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <Pagination
                  currentPage={currentPage.work_request}
                  totalPages={getTotalPages(
                    workRequestData.length,
                    itemsPerPage
                  )}
                  onPageChange={(page) =>
                    handlePageChange("work_request", page)
                  }
                />
              </div>
            </CardContent>
          </Card>
        );
      }

      if (activeTab === "bahanbaku") {
        return (
          <Card className="border-[#2D6A4F]/30 shadow-md">
            <CardHeader className="bg-gradient-to-r from-[#2D6A4F]/10 to-[#52B788]/10 border-b border-[#2D6A4F]/20">
              <CardTitle className="text-[#1B4332]">Bahan Baku</CardTitle>
              <CardDescription>Input data bahan baku</CardDescription>
            </CardHeader>
            <CardContent className="bg-gradient-to-b from-white to-[#F8FAF7] p-6">
              <Modal
                isOpen={showForm}
                onClose={() => {
                  setShowForm(false);
                  setEditingIndex(null);
                }}
                title={
                  editingIndex !== null
                    ? "Edit Data Bahan Baku"
                    : "Tambah Data Bahan Baku"
                }
                size="lg"
              >
                <form onSubmit={handleSubmitBahanBaku} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="tanggalBahan">Tanggal</Label>
                      <Input
                        id="tanggalBahan"
                        type="date"
                        value={formBahanBaku.tanggal}
                        onChange={(e) =>
                          setFormBahanBaku({
                            ...formBahanBaku,
                            tanggal: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="jenisBahanBaku">Jenis Bahan Baku</Label>
                      <Select
                        value={formBahanBaku.jenisBahanBaku}
                        onValueChange={(value) =>
                          setFormBahanBaku({
                            ...formBahanBaku,
                            jenisBahanBaku: value,
                          })
                        }
                      >
                        <SelectTrigger id="jenisBahanBaku">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Urea">Urea</SelectItem>
                          <SelectItem value="DAP">DAP</SelectItem>
                          <SelectItem value="KCL">KCL</SelectItem>
                          <SelectItem value="ZA">ZA</SelectItem>
                          <SelectItem value="Clay">Clay</SelectItem>
                          <SelectItem value="Silica">Silica</SelectItem>
                          <SelectItem value="Pewarna">Pewarna</SelectItem>
                          <SelectItem value="Dolomite">Dolomite</SelectItem>
                          <SelectItem value="Coating Oil">
                            Coating Oil
                          </SelectItem>
                          <SelectItem value="Amnit">Amnit</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="tonaseBahan">Tonase/Berat</Label>
                      <Input
                        id="tonaseBahan"
                        type="number"
                        step="0.01"
                        value={formBahanBaku.tonase}
                        onChange={(e) =>
                          setFormBahanBaku({
                            ...formBahanBaku,
                            tonase: parseFloat(e.target.value) || 0,
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="keteranganBahan">Keterangan</Label>
                      <Input
                        id="keteranganBahan"
                        value={formBahanBaku.keterangan}
                        onChange={(e) =>
                          setFormBahanBaku({
                            ...formBahanBaku,
                            keterangan: e.target.value,
                          })
                        }
                        placeholder="Keterangan tambahan"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      className="bg-[#2D6A4F] hover:bg-[#52B788]"
                      disabled={loading}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      {loading
                        ? "Menyimpan..."
                        : editingIndex !== null
                        ? "Update Data"
                        : "Simpan Data"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowForm(false);
                        setEditingIndex(null);
                      }}
                    >
                      Batal
                    </Button>
                  </div>
                </form>
              </Modal>

              <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-[#1B4332]">
                    Data Bahan Baku
                  </h4>
                  <Button
                    onClick={() => {
                      setShowForm(true);
                      setEditingIndex(null);
                      setFormBahanBaku({
                        tanggal: new Date().toISOString().split("T")[0],
                        jenisBahanBaku: "Urea",
                        tonase: 0,
                        keterangan: "",
                      });
                    }}
                    className="bg-[#2D6A4F] hover:bg-[#52B788]"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Data
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-[#2D6A4F]/20">
                      <tr>
                        <th className="text-left py-2 px-3">Tanggal</th>
                        <th className="text-left py-2 px-3">Jenis Bahan</th>
                        <th className="text-right py-2 px-3">Tonase</th>
                        <th className="text-left py-2 px-3">Keterangan</th>
                        <th className="text-center py-2 px-3">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginateData(
                        sortByDateDesc(bahanBakuData),
                        currentPage.bahan_baku,
                        itemsPerPage
                      ).map((item, idx) => {
                        const actualIdx =
                          sortByDateDesc(bahanBakuData).indexOf(item);
                        return (
                          <tr key={idx} className="border-b hover:bg-gray-50">
                            <td className="py-2 px-3">
                              {new Date(item.tanggal).toLocaleDateString(
                                "id-ID",
                                {
                                  year: "numeric",
                                  month: "2-digit",
                                  day: "2-digit",
                                }
                              )}
                            </td>
                            <td className="py-2 px-3">{item.jenisBahanBaku}</td>
                            <td className="text-right py-2 px-3">
                              {Number(item.tonase || 0).toFixed(2)}
                            </td>
                            <td className="py-2 px-3">{item.keterangan}</td>
                            <td className="text-center py-2 px-3">
                              <div className="flex gap-2 justify-center">
                                {canEditDelete() && (
                                  <>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() =>
                                        handleEdit(actualIdx, "bahan_baku")
                                      }
                                      className="h-9 w-9 p-0 border-[#2D6A4F] text-[#1B4332] hover:bg-[#2D6A4F] hover:text-white"
                                    >
                                      <Edit className="w-5 h-5" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() =>
                                        handleDelete(
                                          actualIdx,
                                          "bahan_baku",
                                          item
                                        )
                                      }
                                      className="h-9 w-9 p-0 border-red-300 text-red-600 hover:bg-red-600 hover:text-white"
                                    >
                                      <Trash2 className="w-5 h-5" />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <Pagination
                  currentPage={currentPage.bahan_baku}
                  totalPages={getTotalPages(bahanBakuData.length, itemsPerPage)}
                  onPageChange={(page) => handlePageChange("bahan_baku", page)}
                />
              </div>
            </CardContent>
          </Card>
        );
      }

      if (activeTab === "vibrasi") {
        return (
          <Card className="border-[#2D6A4F]/30 shadow-md">
            <CardHeader className="bg-gradient-to-r from-[#2D6A4F]/10 to-[#52B788]/10 border-b border-[#2D6A4F]/20">
              <CardTitle className="text-[#1B4332]">Vibrasi</CardTitle>
              <CardDescription>
                Input data pengukuran vibrasi equipment
              </CardDescription>
            </CardHeader>
            <CardContent className="bg-gradient-to-b from-white to-[#F8FAF7] p-6">
              <Modal
                isOpen={showForm}
                onClose={() => {
                  setShowForm(false);
                  setEditingIndex(null);
                }}
                title={
                  editingIndex !== null
                    ? "Edit Data Vibrasi"
                    : "Tambah Data Vibrasi"
                }
                size="lg"
              >
                <form onSubmit={handleSubmitVibrasi} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="tanggalVibrasi">Tanggal</Label>
                      <Input
                        id="tanggalVibrasi"
                        type="date"
                        value={formVibrasi.tanggal}
                        onChange={(e) =>
                          setFormVibrasi({
                            ...formVibrasi,
                            tanggal: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="equipmentVibrasi">Equipment</Label>
                      <Input
                        id="equipmentVibrasi"
                        value={formVibrasi.equipment}
                        onChange={(e) =>
                          setFormVibrasi({
                            ...formVibrasi,
                            equipment: e.target.value,
                          })
                        }
                        placeholder="Nama equipment"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="positionVibrasi">Position</Label>
                      <Select
                        value={formVibrasi.position}
                        onValueChange={(value) =>
                          setFormVibrasi({ ...formVibrasi, position: value })
                        }
                      >
                        <SelectTrigger id="positionVibrasi">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Horizontal">Horizontal</SelectItem>
                          <SelectItem value="Vertical">Vertical</SelectItem>
                          <SelectItem value="Axial">Axial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="pointVibrasi">Point</Label>
                      <Select
                        value={formVibrasi.point}
                        onValueChange={(value) =>
                          setFormVibrasi({ ...formVibrasi, point: value })
                        }
                      >
                        <SelectTrigger id="pointVibrasi">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A">A</SelectItem>
                          <SelectItem value="B">B</SelectItem>
                          <SelectItem value="C">C</SelectItem>
                          <SelectItem value="D">D</SelectItem>
                          <SelectItem value="E">E</SelectItem>
                          <SelectItem value="F">F</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="nilaiVibrasi">Nilai</Label>
                      <Input
                        id="nilaiVibrasi"
                        type="number"
                        step="0.01"
                        value={formVibrasi.nilai}
                        onChange={(e) =>
                          setFormVibrasi({
                            ...formVibrasi,
                            nilai: parseFloat(e.target.value) || 0,
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="keteranganVibrasi">Keterangan</Label>
                      <Input
                        id="keteranganVibrasi"
                        value={formVibrasi.keterangan}
                        onChange={(e) =>
                          setFormVibrasi({
                            ...formVibrasi,
                            keterangan: e.target.value,
                          })
                        }
                        placeholder="Keterangan kondisi"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      className="bg-[#2D6A4F] hover:bg-[#52B788]"
                      disabled={loading}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      {loading
                        ? "Menyimpan..."
                        : editingIndex !== null
                        ? "Update Data"
                        : "Simpan Data"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowForm(false);
                        setEditingIndex(null);
                      }}
                    >
                      Batal
                    </Button>
                  </div>
                </form>
              </Modal>

              <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-[#1B4332]">Data Vibrasi</h4>
                  <Button
                    onClick={() => {
                      setShowForm(true);
                      setEditingIndex(null);
                      setFormVibrasi({
                        tanggal: new Date().toISOString().split("T")[0],
                        equipment: "",
                        position: "Motor",
                        point: "A",
                        nilai: 0,
                        keterangan: "",
                      });
                    }}
                    className="bg-[#2D6A4F] hover:bg-[#52B788]"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Data
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-[#2D6A4F]/20">
                      <tr>
                        <th className="text-left py-2 px-3">Tanggal</th>
                        <th className="text-left py-2 px-3">Equipment</th>
                        <th className="text-left py-2 px-3">Position</th>
                        <th className="text-left py-2 px-3">Point</th>
                        <th className="text-right py-2 px-3">Nilai</th>
                        <th className="text-left py-2 px-3">Keterangan</th>
                        <th className="text-center py-2 px-3">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginateData(
                        sortByDateDesc(vibrasiData),
                        currentPage.vibrasi,
                        itemsPerPage
                      ).map((item, idx) => {
                        const actualIdx =
                          sortByDateDesc(vibrasiData).indexOf(item);
                        return (
                          <tr key={idx} className="border-b hover:bg-gray-50">
                            <td className="py-2 px-3">
                              {new Date(item.tanggal).toLocaleDateString(
                                "id-ID",
                                {
                                  year: "numeric",
                                  month: "2-digit",
                                  day: "2-digit",
                                }
                              )}
                            </td>
                            <td className="py-2 px-3">{item.equipment}</td>
                            <td className="py-2 px-3">{item.position}</td>
                            <td className="py-2 px-3">{item.point}</td>
                            <td className="text-right py-2 px-3">
                              {Number(item.nilai || 0).toFixed(2)}
                            </td>
                            <td className="py-2 px-3">{item.keterangan}</td>
                            <td className="text-center py-2 px-3">
                              <div className="flex gap-2 justify-center">
                                {canEditDelete() && (
                                  <>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() =>
                                        handleEdit(actualIdx, "vibrasi")
                                      }
                                      className="h-9 w-9 p-0 border-[#2D6A4F] text-[#1B4332] hover:bg-[#2D6A4F] hover:text-white"
                                    >
                                      <Edit className="w-5 h-5" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() =>
                                        handleDelete(actualIdx, "vibrasi")
                                      }
                                      className="h-9 w-9 p-0 border-red-300 text-red-600 hover:bg-red-600 hover:text-white"
                                    >
                                      <Trash2 className="w-5 h-5" />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <Pagination
                  currentPage={currentPage.vibrasi}
                  totalPages={getTotalPages(vibrasiData.length, itemsPerPage)}
                  onPageChange={(page) => handlePageChange("vibrasi", page)}
                />
              </div>
            </CardContent>
          </Card>
        );
      }

      if (activeTab === "gatepass") {
        return (
          <Card className="border-[#2D6A4F]/30 shadow-md">
            <CardHeader className="bg-gradient-to-r from-[#2D6A4F]/10 to-[#52B788]/10 border-b border-[#2D6A4F]/20">
              <CardTitle className="text-[#1B4332]">Gate Pass</CardTitle>
              <CardDescription>
                Input data gate pass untuk pengeluaran barang
              </CardDescription>
            </CardHeader>
            <CardContent className="bg-gradient-to-b from-white to-[#F8FAF7] p-6">
              <Modal
                isOpen={showForm}
                onClose={() => {
                  setShowForm(false);
                  setEditingIndex(null);
                }}
                title={
                  editingIndex !== null
                    ? "Edit Data Gate Pass"
                    : "Tambah Data Gate Pass"
                }
                size="xl"
              >
                <form onSubmit={handleSubmitGatePass} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="noFile">No. File (Otomatis)</Label>
                      <Input
                        id="noFile"
                        value={formGatePass.noFile}
                        readOnly
                        className="bg-gray-100 font-semibold"
                      />
                    </div>
                    <div>
                      <Label htmlFor="tanggalGate">Tanggal</Label>
                      <Input
                        id="tanggalGate"
                        type="date"
                        value={formGatePass.tanggal}
                        onChange={(e) =>
                          setFormGatePass({
                            ...formGatePass,
                            tanggal: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="noPol">No. Pol</Label>
                      <Input
                        id="noPol"
                        value={formGatePass.noPol}
                        onChange={(e) =>
                          setFormGatePass({
                            ...formGatePass,
                            noPol: e.target.value,
                          })
                        }
                        placeholder="Nomor polisi kendaraan"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="pemilikBarang">Pemilik Barang</Label>
                      <Input
                        id="pemilikBarang"
                        value={formGatePass.pemilikBarang}
                        onChange={(e) =>
                          setFormGatePass({
                            ...formGatePass,
                            pemilikBarang: e.target.value,
                          })
                        }
                        placeholder="Nama pemilik barang"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="namaPembawa">Nama Pembawa</Label>
                      <Input
                        id="namaPembawa"
                        value={formGatePass.namaPembawa}
                        onChange={(e) =>
                          setFormGatePass({
                            ...formGatePass,
                            namaPembawa: e.target.value,
                          })
                        }
                        placeholder="Nama pembawa barang"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="namaBarang">Nama Barang</Label>
                      <Input
                        id="namaBarang"
                        value={formGatePass.namaBarang}
                        onChange={(e) =>
                          setFormGatePass({
                            ...formGatePass,
                            namaBarang: e.target.value,
                          })
                        }
                        placeholder="Nama barang yang keluar"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="alasanMengeluarkan">
                        Alasan Mengeluarkan Barang
                      </Label>
                      <Input
                        id="alasanMengeluarkan"
                        value={formGatePass.alasanMengeluarkan}
                        onChange={(e) =>
                          setFormGatePass({
                            ...formGatePass,
                            alasanMengeluarkan: e.target.value,
                          })
                        }
                        placeholder="Alasan pengeluaran barang"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="approver">Approver</Label>
                      <Input
                        id="approver"
                        value={formGatePass.approver}
                        onChange={(e) =>
                          setFormGatePass({
                            ...formGatePass,
                            approver: e.target.value,
                          })
                        }
                        placeholder="Nama yang menyetujui"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      className="bg-[#2D6A4F] hover:bg-[#52B788]"
                      disabled={loading}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      {loading
                        ? "Menyimpan..."
                        : editingIndex !== null
                        ? "Update Data"
                        : "Simpan Data"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowForm(false);
                        setEditingIndex(null);
                      }}
                    >
                      Batal
                    </Button>
                  </div>
                </form>
              </Modal>

              <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-[#1B4332]">
                    Data Gate Pass
                  </h4>
                  <Button
                    onClick={() => {
                      setShowForm(true);
                      setEditingIndex(null);
                      generateGatePassNumber();
                      setFormGatePass({
                        ...formGatePass,
                        tanggal: new Date().toISOString().split("T")[0],
                        noPol: "",
                        pemilikBarang: "",
                        namaPembawa: "",
                        namaBarang: "",
                        alasanMengeluarkan: "",
                        approver: "",
                      });
                    }}
                    className="bg-[#2D6A4F] hover:bg-[#52B788]"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Data
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-[#2D6A4F]/20">
                      <tr>
                        <th className="text-left py-2 px-3">No. File</th>
                        <th className="text-left py-2 px-3">Tanggal</th>
                        <th className="text-left py-2 px-3">No. Pol</th>
                        <th className="text-left py-2 px-3">Pemilik Barang</th>
                        <th className="text-left py-2 px-3">Pembawa</th>
                        <th className="text-left py-2 px-3">Nama Barang</th>
                        <th className="text-left py-2 px-3">Alasan</th>
                        <th className="text-left py-2 px-3">Approver</th>
                        <th className="text-center py-2 px-3">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginateData(
                        sortByDateDesc(gatePassData),
                        currentPage.gate_pass,
                        itemsPerPage
                      ).map((item, idx) => {
                        const actualIdx =
                          sortByDateDesc(gatePassData).indexOf(item);
                        return (
                          <tr key={idx} className="border-b hover:bg-gray-50">
                            <td className="py-2 px-3 font-mono text-xs">
                              {item.noFile}
                            </td>
                            <td className="py-2 px-3">
                              {new Date(item.tanggal).toLocaleDateString(
                                "id-ID",
                                {
                                  year: "numeric",
                                  month: "2-digit",
                                  day: "2-digit",
                                }
                              )}
                            </td>
                            <td className="py-2 px-3">{item.noPol}</td>
                            <td className="py-2 px-3">{item.pemilikBarang}</td>
                            <td className="py-2 px-3">{item.namaPembawa}</td>
                            <td className="py-2 px-3">{item.namaBarang}</td>
                            <td className="py-2 px-3">
                              {item.alasanMengeluarkan}
                            </td>
                            <td className="py-2 px-3">{item.approver}</td>
                            <td className="text-center py-2 px-3">
                              <div className="flex gap-2 justify-center">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handlePrintGatePass(item)}
                                  className="h-9 w-9 p-0 border-blue-300 text-blue-600 hover:bg-blue-600 hover:text-white"
                                >
                                  <Printer className="w-5 h-5" />
                                </Button>
                                {canEditDelete() && (
                                  <>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() =>
                                        handleEdit(actualIdx, "gate_pass")
                                      }
                                      className="h-9 w-9 p-0 border-[#2D6A4F] text-[#1B4332] hover:bg-[#2D6A4F] hover:text-white"
                                    >
                                      <Edit className="w-5 h-5" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() =>
                                        handleDelete(actualIdx, "gate_pass")
                                      }
                                      className="h-9 w-9 p-0 border-red-300 text-red-600 hover:bg-red-600 hover:text-white"
                                    >
                                      <Trash2 className="w-5 h-5" />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <Pagination
                  currentPage={currentPage.gate_pass}
                  totalPages={getTotalPages(gatePassData.length, itemsPerPage)}
                  onPageChange={(page) => handlePageChange("gate_pass", page)}
                />
              </div>
            </CardContent>
          </Card>
        );
      }
    }

    if (activeNav === "setting") {
      if (activeTab === "akun") {
        return (
          <Card className="border-[#2D6A4F]/30 shadow-md">
            <CardHeader className="bg-gradient-to-r from-[#2D6A4F]/10 to-[#52B788]/10 border-b border-[#2D6A4F]/20">
              <CardTitle className="text-[#1B4332]">Akun</CardTitle>
              <CardDescription>Manajemen akun dan password</CardDescription>
            </CardHeader>
            <CardContent className="bg-gradient-to-b from-white to-[#F8FAF7] p-6">
              <Modal
                isOpen={showForm}
                onClose={() => {
                  setShowForm(false);
                  setEditingIndex(null);
                }}
                title={
                  editingIndex !== null ? "Edit Data Akun" : "Tambah Data Akun"
                }
                size="lg"
              >
                <form onSubmit={handleSubmitAkun} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="noBadge">No. Badge</Label>
                      <Input
                        id="noBadge"
                        value={formAkun.noBadge}
                        onChange={(e) =>
                          setFormAkun({ ...formAkun, noBadge: e.target.value })
                        }
                        placeholder="Nomor badge karyawan"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="namaAkun">Nama</Label>
                      <Input
                        id="namaAkun"
                        value={formAkun.nama}
                        onChange={(e) =>
                          setFormAkun({ ...formAkun, nama: e.target.value })
                        }
                        placeholder="Nama lengkap"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="jabatan">Jabatan</Label>
                      <Input
                        id="jabatan"
                        value={formAkun.jabatan}
                        onChange={(e) =>
                          setFormAkun({ ...formAkun, jabatan: e.target.value })
                        }
                        placeholder="Jabatan"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="passwordESS">Password ESS</Label>
                      <Input
                        id="passwordESS"
                        type="password"
                        value={formAkun.passwordESS}
                        onChange={(e) =>
                          setFormAkun({
                            ...formAkun,
                            passwordESS: e.target.value,
                          })
                        }
                        placeholder="Password ESS"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="passwordPismart">Password Pismart</Label>
                      <Input
                        id="passwordPismart"
                        type="password"
                        value={formAkun.passwordPismart}
                        onChange={(e) =>
                          setFormAkun({
                            ...formAkun,
                            passwordPismart: e.target.value,
                          })
                        }
                        placeholder="Password Pismart"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="passwordDOF">Password DOF</Label>
                      <Input
                        id="passwordDOF"
                        type="password"
                        value={formAkun.passwordDOF}
                        onChange={(e) =>
                          setFormAkun({
                            ...formAkun,
                            passwordDOF: e.target.value,
                          })
                        }
                        placeholder="Password DOF"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="tanggalUpdate">
                        Tanggal Terakhir Update
                      </Label>
                      <Input
                        id="tanggalUpdate"
                        type="date"
                        value={formAkun.tanggalUpdate}
                        onChange={(e) =>
                          setFormAkun({
                            ...formAkun,
                            tanggalUpdate: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      className="bg-[#2D6A4F] hover:bg-[#52B788]"
                      disabled={loading}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      {loading
                        ? "Menyimpan..."
                        : editingIndex !== null
                        ? "Update Data"
                        : "Simpan Data"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowForm(false);
                        setEditingIndex(null);
                      }}
                    >
                      Batal
                    </Button>
                  </div>
                </form>
              </Modal>

              <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-[#1B4332]">Data Akun</h4>
                  <Button
                    onClick={() => {
                      setShowForm(true);
                      setEditingIndex(null);
                      setFormAkun({
                        noBadge: "",
                        nama: "",
                        jabatan: "",
                        passwordESS: "",
                        passwordPismart: "",
                        passwordDOF: "",
                        tanggalUpdate: new Date().toISOString().split("T")[0],
                      });
                    }}
                    className="bg-[#2D6A4F] hover:bg-[#52B788]"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Data
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-[#2D6A4F]/20">
                      <tr>
                        <th className="text-left py-2 px-3">No. Badge</th>
                        <th className="text-left py-2 px-3">Nama</th>
                        <th className="text-left py-2 px-3">Jabatan</th>
                        <th className="text-left py-2 px-3">Tanggal Update</th>
                        <th className="text-center py-2 px-3">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginateData(
                        sortByUpdateDateDesc(akunData),
                        currentPage.akun,
                        itemsPerPage
                      ).map((item, idx) => {
                        const actualIdx =
                          sortByUpdateDateDesc(akunData).indexOf(item);
                        return (
                          <tr key={idx} className="border-b hover:bg-gray-50">
                            <td className="py-2 px-3">{item.noBadge}</td>
                            <td className="py-2 px-3">{item.nama}</td>
                            <td className="py-2 px-3">{item.jabatan}</td>
                            <td className="py-2 px-3">
                              {new Date(item.tanggalUpdate).toLocaleDateString(
                                "id-ID",
                                {
                                  year: "numeric",
                                  month: "2-digit",
                                  day: "2-digit",
                                }
                              )}
                            </td>
                            <td className="text-center py-2 px-3">
                              <div className="flex gap-2 justify-center">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleViewAkun(item)}
                                  className="h-9 w-9 p-0 border-blue-300 text-blue-600 hover:bg-blue-600 hover:text-white"
                                >
                                  <Eye className="w-5 h-5" />
                                </Button>
                                {canEditDelete() && (
                                  <>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() =>
                                        handleEdit(actualIdx, "akun")
                                      }
                                      className="h-9 w-9 p-0 border-[#2D6A4F] text-[#1B4332] hover:bg-[#2D6A4F] hover:text-white"
                                    >
                                      <Edit className="w-5 h-5" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() =>
                                        handleDelete(actualIdx, "akun", item)
                                      }
                                      className="h-9 w-9 p-0 border-red-300 text-red-600 hover:bg-red-600 hover:text-white"
                                    >
                                      <Trash2 className="w-5 h-5" />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <Pagination
                  currentPage={currentPage.akun}
                  totalPages={getTotalPages(akunData.length, itemsPerPage)}
                  onPageChange={(page) => handlePageChange("akun", page)}
                />
              </div>
            </CardContent>
          </Card>
        );
      }

      if (activeTab === "rkap") {
        return (
          <Card className="border-[#2D6A4F]/30 shadow-md">
            <CardHeader className="bg-gradient-to-r from-[#2D6A4F]/10 to-[#52B788]/10 border-b border-[#2D6A4F]/20">
              <CardTitle className="text-[#1B4332]">
                RKAP (Rencana Kerja dan Anggaran Perusahaan)
              </CardTitle>
              <CardDescription>Setting target produksi bulanan</CardDescription>
            </CardHeader>
            <CardContent className="bg-gradient-to-b from-white to-[#F8FAF7] p-6">
              <Modal
                isOpen={showForm}
                onClose={() => {
                  setShowForm(false);
                  setEditingIndex(null);
                }}
                title={
                  editingIndex !== null ? "Edit Data RKAP" : "Tambah Data RKAP"
                }
                size="md"
              >
                <form onSubmit={handleSubmitRKAP} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="bulanRKAP">Bulan</Label>
                      <Select
                        value={formRKAP.bulan}
                        onValueChange={(value) =>
                          setFormRKAP({ ...formRKAP, bulan: value })
                        }
                      >
                        <SelectTrigger id="bulanRKAP">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Januari">Januari</SelectItem>
                          <SelectItem value="Februari">Februari</SelectItem>
                          <SelectItem value="Maret">Maret</SelectItem>
                          <SelectItem value="April">April</SelectItem>
                          <SelectItem value="Mei">Mei</SelectItem>
                          <SelectItem value="Juni">Juni</SelectItem>
                          <SelectItem value="Juli">Juli</SelectItem>
                          <SelectItem value="Agustus">Agustus</SelectItem>
                          <SelectItem value="September">September</SelectItem>
                          <SelectItem value="Oktober">Oktober</SelectItem>
                          <SelectItem value="November">November</SelectItem>
                          <SelectItem value="Desember">Desember</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="targetRKAP">Target RKAP (Ton)</Label>
                      <Input
                        id="targetRKAP"
                        type="number"
                        step="0.01"
                        value={formRKAP.targetRKAP}
                        onChange={(e) =>
                          setFormRKAP({
                            ...formRKAP,
                            targetRKAP: parseFloat(e.target.value) || 0,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      className="bg-[#2D6A4F] hover:bg-[#52B788]"
                      disabled={loading}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      {loading
                        ? "Menyimpan..."
                        : editingIndex !== null
                        ? "Update Data"
                        : "Simpan Data"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowForm(false);
                        setEditingIndex(null);
                      }}
                    >
                      Batal
                    </Button>
                  </div>
                </form>
              </Modal>

              <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-[#1B4332]">Data RKAP</h4>
                  <Button
                    onClick={() => {
                      setShowForm(true);
                      setEditingIndex(null);
                      setFormRKAP({
                        bulan: "Januari",
                        targetRKAP: 0,
                      });
                    }}
                    className="bg-[#2D6A4F] hover:bg-[#52B788]"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Data
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-[#2D6A4F]/20">
                      <tr>
                        <th className="text-left py-2 px-3">Bulan</th>
                        <th className="text-right py-2 px-3">
                          Target RKAP (Ton)
                        </th>
                        <th className="text-center py-2 px-3">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginateData(
                        rkapData,
                        currentPage.rkap,
                        itemsPerPage
                      ).map((item, idx) => {
                        const actualIdx = rkapData.indexOf(item);
                        return (
                          <tr key={idx} className="border-b hover:bg-gray-50">
                            <td className="py-2 px-3 font-semibold">
                              {item.bulan}
                            </td>
                            <td className="text-right py-2 px-3">
                              {Number(item.targetRKAP || 0).toFixed(2)}
                            </td>
                            <td className="text-center py-2 px-3">
                              <div className="flex gap-2 justify-center">
                                {canEditDelete() && (
                                  <>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() =>
                                        handleEdit(actualIdx, "rkap")
                                      }
                                      className="h-9 w-9 p-0 border-[#2D6A4F] text-[#1B4332] hover:bg-[#2D6A4F] hover:text-white"
                                    >
                                      <Edit className="w-5 h-5" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() =>
                                        handleDelete(actualIdx, "rkap", item)
                                      }
                                      className="h-9 w-9 p-0 border-red-300 text-red-600 hover:bg-red-600 hover:text-white"
                                    >
                                      <Trash2 className="w-5 h-5" />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <Pagination
                  currentPage={currentPage.rkap}
                  totalPages={getTotalPages(rkapData.length, itemsPerPage)}
                  onPageChange={(page) => handlePageChange("rkap", page)}
                />
              </div>
            </CardContent>
          </Card>
        );
      }
    }

    return (
      <Card>
        <CardContent className="flex items-center justify-center h-96">
          <div className="text-center">
            <p className="text-gray-500">Pilih menu untuk memulai</p>
          </div>
        </CardContent>
      </Card>
    );
  };

  const navItems = [
    { id: "home", icon: Home, label: "Home", tabs: [] },
    {
      id: "produksi",
      icon: Factory,
      label: "Produksi",
      tabs: [
        { id: "npk", label: "Produksi Granul" },
        { id: "blending", label: "Produksi Blending" },
        { id: "mini", label: "Produksi NPK Mini" },
      ],
    },
    {
      id: "laporan",
      icon: FileText,
      label: "Laporan",
      tabs: [
        { id: "forklift", label: "Timesheet Forklift" },
        { id: "loader", label: "Timesheet Loader" },
        { id: "downtime", label: "Downtime" },
      ],
    },
    {
      id: "data",
      icon: Database,
      label: "Data",
      tabs: [
        { id: "workrequest", label: "Work Request" },
        { id: "bahanbaku", label: "Bahan Baku" },
        { id: "vibrasi", label: "Vibrasi" },
        { id: "gatepass", label: "Gate Pass" },
      ],
    },
    {
      id: "setting",
      icon: Settings,
      label: "Setting",
      tabs: [
        { id: "akun", label: "Akun" },
        { id: "rkap", label: "RKAP" },
      ],
    },
  ];

  const handleNavClick = (navId: string) => {
    setActiveNav(navId);
    const nav = navItems.find((item) => item.id === navId);
    if (nav && nav.tabs && nav.tabs.length > 0) {
      setActiveTab(nav.tabs[0].id);
    } else {
      setActiveTab("");
    }
  };

  // Show login screen if not logged in
  if (!isLoggedIn) {
    return (
      <>
        <LoginPage
          onLogin={handleLogin}
          username={loginUsername}
          setUsername={setLoginUsername}
          password={loginPassword}
          setPassword={setLoginPassword}
          error={loginError}
          setError={setLoginError}
        />

        {/* Account In Use Warning Overlay - Must be here for login screen */}
        {showAccountInUseWarning && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[100]">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-[slideIn_0.3s_ease-out]">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="relative">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <AlertCircle className="w-12 h-12 text-orange-500 animate-pulse" />
                    </div>
                    <div className="absolute inset-0 w-20 h-20 border-4 border-white/30 rounded-full animate-ping"></div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white text-center">
                  Akun Sedang Digunakan
                </h3>
              </div>

              <div className="p-6">
                <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-4 rounded">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {accountInUseMessage}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <div className="flex-1 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full overflow-hidden">
                    <div className="h-full bg-white/50 animate-[slideRight_5s_linear]"></div>
                  </div>
                  <span className="text-xs font-medium">
                    Menutup dalam 5 detik...
                  </span>
                </div>

                <div className="text-center">
                  <p className="text-xs text-red-600 font-medium">
                    ⛔ Login Ditolak - Akun Sedang Aktif
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Login Success Overlay Animation */}
        {showLoginOverlay && (
          <div className="fixed inset-0 bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#52B788] flex items-center justify-center z-[100]">
            <div className="text-center">
              <div className="relative mb-8">
                <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#2D6A4F] to-[#52B788] rounded-full flex items-center justify-center">
                    <span className="text-4xl font-bold text-white">
                      {loginUsername === "admin"
                        ? "A"
                        : loginUsername === "supervisor"
                        ? "S"
                        : "U"}
                    </span>
                  </div>
                </div>
                <div className="absolute inset-0 w-24 h-24 mx-auto">
                  <div className="w-full h-full border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 animate-pulse">
                Logging In...
              </h3>
              <p className="text-white/80 text-sm">
                Selamat datang di NPK Production System
              </p>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8FAF5] to-[#E8F5E9] flex">
      <aside className="w-64 bg-gradient-to-b from-[#1B4332] to-[#2D6A4F] text-white flex flex-col fixed left-0 top-0 bottom-0 overflow-y-auto">
        <div className="p-6 border-b border-white/20">
          <h1 className="text-2xl font-bold text-[#FFD700]">NPK Production</h1>
          <p className="text-sm opacity-90 mt-1">Management System</p>
        </div>

        <nav className="flex-1 py-4">
          {navItems
            .filter((item) => item.id !== "setting")
            .map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center gap-3 px-6 py-3 transition-all ${
                      activeNav === item.id
                        ? "bg-white/20 border-l-4 border-white"
                        : "hover:bg-white/10"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>

                  {activeNav === item.id &&
                    item.tabs &&
                    item.tabs.length > 0 && (
                      <div className="bg-black/10 py-2">
                        {item.tabs.map((tab) => (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full text-left px-12 py-2 text-sm transition-all ${
                              activeTab === tab.id
                                ? "bg-white/20 font-semibold"
                                : "hover:bg-white/10 opacity-80"
                            }`}
                          >
                            {tab.label}
                          </button>
                        ))}
                      </div>
                    )}
                </div>
              );
            })}
        </nav>

        {(() => {
          const settingItem = navItems.find((item) => item.id === "setting");
          const Icon = settingItem?.icon || Settings;
          return (
            <div className="border-t border-white/20">
              <button
                onClick={() => handleNavClick("setting")}
                className={`w-full flex items-center gap-3 px-6 py-3 transition-all ${
                  activeNav === "setting"
                    ? "bg-white/20 border-l-4 border-white"
                    : "hover:bg-white/10"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">Setting</span>
              </button>

              {activeNav === "setting" &&
                settingItem?.tabs &&
                settingItem.tabs.length > 0 && (
                  <div className="bg-black/10 py-2">
                    {settingItem.tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full text-left px-12 py-2 text-sm transition-all ${
                          activeTab === tab.id
                            ? "bg-white/20 font-semibold"
                            : "hover:bg-white/10 opacity-80"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                )}
            </div>
          );
        })()}

        <div className="mt-auto border-t border-white/20">
          {/* User Info */}
          <div className="p-4 bg-white/5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-lg font-bold">
                  {userRole === "admin"
                    ? "A"
                    : userRole === "supervisor"
                    ? "S"
                    : "U"}
                </span>
              </div>
              <div>
                <p className="font-semibold text-sm">
                  {userRole === "admin"
                    ? "Admin"
                    : userRole === "supervisor"
                    ? "Supervisor"
                    : "User"}
                </p>
                <p className="text-xs opacity-75">
                  {userRole === "admin"
                    ? "Administrator"
                    : userRole === "supervisor"
                    ? "Supervisor"
                    : "User"}
                </p>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              className="w-full mt-2 bg-red-500/80 hover:bg-red-600 text-white border-none"
              size="sm"
            >
              Logout
            </Button>
          </div>

          <div className="p-4">
            <p className="text-xs opacity-75">
              v1.18 - 2025 | NPKG-2 Production
            </p>
            <p className="text-xs opacity-75 mt-1">
              Made with <span className="text-red-500">??</span>
            </p>
          </div>
        </div>
      </aside>

      {/* Notification Bell - Only for Admin - Fixed Position */}
      {canEditDelete() && (
        <div className="fixed top-6 right-6 z-50 notification-dropdown">
          <Button
            onClick={() => setShowNotifications(!showNotifications)}
            variant="outline"
            size="sm"
            className="relative border-[#2D6A4F] text-[#1B4332] hover:bg-[#2D6A4F] hover:text-white"
          >
            <Bell className="w-5 h-5" />
            {notifications.filter((n) => !n.read).length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {notifications.filter((n) => !n.read).length}
              </span>
            )}
          </Button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-96 overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center">
                <h3 className="font-semibold text-[#1B4332]">Notifikasi</h3>
                <div className="flex gap-2">
                  {notifications.filter((n) => !n.read).length > 0 && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setNotifications(
                          notifications.map((n) => ({ ...n, read: true }))
                        );
                        localStorage.setItem(
                          "notifications",
                          JSON.stringify(
                            notifications.map((n) => ({
                              ...n,
                              read: true,
                            }))
                          )
                        );
                      }}
                      className="text-xs text-[#2D6A4F] hover:text-[#1B4332]"
                    >
                      Tandai Semua Dibaca
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowNotifications(false)}
                    className="h-6 w-6 p-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Bell className="w-12 h-12 mx-auto mb-2 opacity-30" />
                  <p>Tidak ada notifikasi</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {notifications
                    .slice()
                    .reverse()
                    .map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-4 hover:bg-gray-50 transition-colors ${
                          !notif.read ? "bg-blue-50" : ""
                        }`}
                        onClick={() => {
                          const updatedNotifs = notifications.map((n) =>
                            n.id === notif.id ? { ...n, read: true } : n
                          );
                          setNotifications(updatedNotifs);
                          localStorage.setItem(
                            "notifications",
                            JSON.stringify(updatedNotifs)
                          );
                        }}
                      >
                        <div className="flex items-start gap-2">
                          {!notif.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-800 break-words">
                              {notif.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(notif.timestamp).toLocaleString(
                                "id-ID",
                                {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              const updatedNotifs = notifications.filter(
                                (n) => n.id !== notif.id
                              );
                              setNotifications(updatedNotifs);
                              localStorage.setItem(
                                "notifications",
                                JSON.stringify(updatedNotifs)
                              );
                            }}
                            className="h-6 w-6 p-0 text-gray-400 hover:text-red-600"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              )}

              {notifications.length > 0 && (
                <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 py-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setNotifications([]);
                      localStorage.removeItem("notifications");
                    }}
                    className="w-full text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    Hapus Semua Notifikasi
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <main className="flex-1 ml-64 p-8 overflow-y-auto h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-[#1B4332]">
              {navItems.find((item) => item.id === activeNav)?.label}
            </h2>
            {activeTab && (
              <p className="text-gray-600 mt-1">
                {
                  navItems
                    .find((item) => item.id === activeNav)
                    ?.tabs?.find((tab) => tab.id === activeTab)?.label
                }
              </p>
            )}
          </div>

          {renderContent()}
        </div>
      </main>

      {/* Modal Password */}
      {passwordModal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <form onSubmit={handlePasswordSubmit} className="p-6">
              <h3 className="text-xl font-bold text-[#1B4332] mb-4">
                Masukkan Password
              </h3>
              <input
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2D6A4F] focus:border-transparent"
                autoFocus
              />
              <div className="flex gap-3 mt-4">
                <Button
                  type="submit"
                  className="flex-1 bg-[#2D6A4F] hover:bg-[#1B4332]"
                >
                  OK
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setPasswordModal({ show: false, pendingAkun: null });
                    setPasswordInput("");
                  }}
                  className="flex-1 bg-gray-400 hover:bg-gray-500"
                >
                  Batal
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal View Akun */}
      {viewAkunModal.show && viewAkunModal.data && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-[#1B4332]">
                  Detail Akun
                </h3>
                <button
                  onClick={() => setViewAkunModal({ show: false, data: null })}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  �
                </button>
              </div>
              {viewAkunModal.data && (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="font-semibold text-gray-700">
                      No. Badge:
                    </div>
                    <div className="col-span-2">
                      {viewAkunModal.data!.noBadge}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="font-semibold text-gray-700">Nama:</div>
                    <div className="col-span-2">{viewAkunModal.data!.nama}</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="font-semibold text-gray-700">Jabatan:</div>
                    <div className="col-span-2">
                      {viewAkunModal.data!.jabatan}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 items-start">
                    <div className="font-semibold text-gray-700 pt-2">
                      Password ESS:
                    </div>
                    <div className="col-span-2 space-y-2">
                      <div className="flex items-center gap-2 relative">
                        <div className="flex-1 font-mono bg-gray-100 p-2 rounded">
                          {viewAkunModal.data!.passwordESS}
                        </div>
                        <Button
                          size="sm"
                          onClick={() =>
                            handleOpenLoginLink(
                              "https://hcservices.pupuk-indonesia.com/nwbc",
                              viewAkunModal.data!.noBadge,
                              viewAkunModal.data!.passwordESS,
                              "ess-open"
                            )
                          }
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 h-auto whitespace-nowrap relative"
                          title="Buka website ESS"
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Open
                        </Button>
                        {copySuccess["ess-open"] && (
                          <div className="absolute -right-8 top-1/2 -translate-y-1/2 animate-bounce">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          </div>
                        )}
                      </div>
                      <div className="flex gap-12">
                        <div className="relative">
                          <Button
                            size="sm"
                            onClick={() =>
                              handleCopyText(
                                viewAkunModal.data!.noBadge,
                                "Username",
                                "ess-username"
                              )
                            }
                            className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 h-auto text-xs whitespace-nowrap"
                            title="Copy username"
                          >
                            <Copy className="w-3 h-3 mr-1" />
                            Copy User
                          </Button>
                          {copySuccess["ess-username"] && (
                            <div className="absolute -right-7 top-1/2 -translate-y-1/2 animate-bounce">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            </div>
                          )}
                        </div>
                        <div className="relative">
                          <Button
                            size="sm"
                            onClick={() =>
                              handleCopyText(
                                viewAkunModal.data!.passwordESS,
                                "Password ESS",
                                "ess-password"
                              )
                            }
                            className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 h-auto text-xs whitespace-nowrap"
                            title="Copy password"
                          >
                            <Copy className="w-3 h-3 mr-1" />
                            Copy Pass
                          </Button>
                          {copySuccess["ess-password"] && (
                            <div className="absolute -right-7 top-1/2 -translate-y-1/2 animate-bounce">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 items-start">
                    <div className="font-semibold text-gray-700 pt-2">
                      Password Pismart:
                    </div>
                    <div className="col-span-2 space-y-2">
                      <div className="flex items-center gap-2 relative">
                        <div className="flex-1 font-mono bg-gray-100 p-2 rounded">
                          {viewAkunModal.data!.passwordPismart}
                        </div>
                        <Button
                          size="sm"
                          onClick={() =>
                            handleOpenLoginLink(
                              "https://pismart.pupuk-indonesia.com",
                              viewAkunModal.data!.noBadge,
                              viewAkunModal.data!.passwordPismart,
                              "pismart-open"
                            )
                          }
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 h-auto whitespace-nowrap relative"
                          title="Buka website Pismart"
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Open
                        </Button>
                        {copySuccess["pismart-open"] && (
                          <div className="absolute -right-8 top-1/2 -translate-y-1/2 animate-bounce">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          </div>
                        )}
                      </div>
                      <div className="flex gap-12">
                        <div className="relative">
                          <Button
                            size="sm"
                            onClick={() =>
                              handleCopyText(
                                viewAkunModal.data!.noBadge,
                                "Username",
                                "pismart-username"
                              )
                            }
                            className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 h-auto text-xs whitespace-nowrap"
                            title="Copy username"
                          >
                            <Copy className="w-3 h-3 mr-1" />
                            Copy User
                          </Button>
                          {copySuccess["pismart-username"] && (
                            <div className="absolute -right-7 top-1/2 -translate-y-1/2 animate-bounce">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            </div>
                          )}
                        </div>
                        <div className="relative">
                          <Button
                            size="sm"
                            onClick={() =>
                              handleCopyText(
                                viewAkunModal.data!.passwordPismart,
                                "Password Pismart",
                                "pismart-password"
                              )
                            }
                            className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 h-auto text-xs whitespace-nowrap"
                            title="Copy password"
                          >
                            <Copy className="w-3 h-3 mr-1" />
                            Copy Pass
                          </Button>
                          {copySuccess["pismart-password"] && (
                            <div className="absolute -right-7 top-1/2 -translate-y-1/2 animate-bounce">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 items-start">
                    <div className="font-semibold text-gray-700 pt-2">
                      Password DOF:
                    </div>
                    <div className="col-span-2 space-y-2">
                      <div className="flex items-center gap-2 relative">
                        <div className="flex-1 font-mono bg-gray-100 p-2 rounded">
                          {viewAkunModal.data!.passwordDOF}
                        </div>
                        <Button
                          size="sm"
                          onClick={() =>
                            handleOpenLoginLink(
                              "https://dof.pupuk-indonesia.com",
                              viewAkunModal.data!.noBadge,
                              viewAkunModal.data!.passwordDOF,
                              "dof-open"
                            )
                          }
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 h-auto whitespace-nowrap relative"
                          title="Buka website DOF"
                        >
                          <ExternalLink className="w-4 h-4 mr-1" />
                          Open
                        </Button>
                        {copySuccess["dof-open"] && (
                          <div className="absolute -right-8 top-1/2 -translate-y-1/2 animate-bounce">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          </div>
                        )}
                      </div>
                      <div className="flex gap-12">
                        <div className="relative">
                          <Button
                            size="sm"
                            onClick={() =>
                              handleCopyText(
                                viewAkunModal.data!.noBadge,
                                "Username",
                                "dof-username"
                              )
                            }
                            className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 h-auto text-xs whitespace-nowrap"
                            title="Copy username"
                          >
                            <Copy className="w-3 h-3 mr-1" />
                            Copy User
                          </Button>
                          {copySuccess["dof-username"] && (
                            <div className="absolute -right-7 top-1/2 -translate-y-1/2 animate-bounce">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            </div>
                          )}
                        </div>
                        <div className="relative">
                          <Button
                            size="sm"
                            onClick={() =>
                              handleCopyText(
                                viewAkunModal.data!.passwordDOF,
                                "Password DOF",
                                "dof-password"
                              )
                            }
                            className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 h-auto text-xs whitespace-nowrap"
                            title="Copy password"
                          >
                            <Copy className="w-3 h-3 mr-1" />
                            Copy Pass
                          </Button>
                          {copySuccess["dof-password"] && (
                            <div className="absolute -right-7 top-1/2 -translate-y-1/2 animate-bounce">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="font-semibold text-gray-700">
                      Tanggal Update:
                    </div>
                    <div className="col-span-2">
                      {new Date(
                        viewAkunModal.data!.tanggalUpdate
                      ).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </div>
              )}
              <div className="mt-6 flex justify-end">
                <Button
                  onClick={() => setViewAkunModal({ show: false, data: null })}
                  className="bg-[#2D6A4F] hover:bg-[#1B4332]"
                >
                  Tutup
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {showLoadingOverlay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-[100]">
          <div className="bg-white rounded-lg p-8 flex flex-col items-center gap-4">
            <Loader2 className="w-16 h-16 text-[#2D6A4F] animate-spin" />
            <p className="text-lg font-semibold text-gray-700">
              Memproses data...
            </p>
          </div>
        </div>
      )}

      {/* Success Overlay */}
      {showSuccessOverlay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-[100]">
          <div className="bg-white rounded-lg p-8 flex flex-col items-center gap-4 animate-bounce">
            <CheckCircle className="w-16 h-16 text-green-500" />
            <p className="text-lg font-semibold text-gray-700">
              {successMessage}
            </p>
          </div>
        </div>
      )}

      {/* Logout Overlay */}
      {showLogoutOverlay && (
        <div className="fixed inset-0 bg-gradient-to-br from-[#1B4332] via-[#2D6A4F] to-[#52B788] flex items-center justify-center z-[100]">
          <div className="text-center">
            <div className="relative mb-8">
              <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                <div className="w-20 h-20 bg-gradient-to-br from-[#2D6A4F] to-[#52B788] rounded-full flex items-center justify-center">
                  <span className="text-4xl font-bold text-white">
                    {userRole === "admin"
                      ? "A"
                      : userRole === "supervisor"
                      ? "S"
                      : "U"}
                  </span>
                </div>
              </div>
              <div className="absolute inset-0 w-24 h-24 mx-auto">
                <div className="w-full h-full border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 animate-pulse">
              Logging Out...
            </h3>
            <p className="text-white/80 text-sm">
              Terima kasih telah menggunakan sistem
            </p>
          </div>
        </div>
      )}

      {/* Account In Use Warning Overlay */}
      {showAccountInUseWarning && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[100]">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-[slideIn_0.3s_ease-out]">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-6">
              <div className="flex items-center justify-center mb-4">
                <div className="relative">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <AlertCircle className="w-12 h-12 text-orange-500 animate-pulse" />
                  </div>
                  <div className="absolute inset-0 w-20 h-20 border-4 border-white/30 rounded-full animate-ping"></div>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white text-center">
                Akun Sedang Digunakan
              </h3>
            </div>

            <div className="p-6">
              <div className="bg-orange-50 border-l-4 border-orange-500 p-4 mb-4 rounded">
                <p className="text-gray-700 text-sm leading-relaxed">
                  {accountInUseMessage}
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                <div className="flex-1 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full overflow-hidden">
                  <div className="h-full bg-white/50 animate-[slideRight_5s_linear]"></div>
                </div>
                <span className="text-xs font-medium">
                  Menutup dalam 5 detik...
                </span>
              </div>

              <div className="text-center">
                <p className="text-xs text-red-600 font-medium">
                  ⛔ Login Ditolak - Akun Sedang Aktif
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
