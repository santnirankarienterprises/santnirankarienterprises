"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Loader2, Plus, Shield, IndianRupee, Trash2, Mail, Lock, User as UserIcon } from "lucide-react";

type Admin = {
  id: string;
  fullName: string;
  email: string;
  createdAt: string;
};

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [savingFee, setSavingFee] = useState(false);
  const [premiumFee, setPremiumFee] = useState("499");
  
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [isAddingAdmin, setIsAddingAdmin] = useState(false);
  
  const [newAdmin, setNewAdmin] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [settingsRes, adminsRes] = await Promise.all([
        fetch("/api/admin/settings"),
        fetch("/api/admin/sub-admins")
      ]);
      const settingsData = await settingsRes.json();
      const adminsData = await adminsRes.json();

      if (settingsData.success) {
        setPremiumFee(settingsData.settings.premiumFee);
      }
      if (adminsData.success) {
        setAdmins(adminsData.admins);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load settings data");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveFee = async () => {
    setSavingFee(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ premiumFee }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Premium fee updated successfully!");
      } else {
        toast.error(data.message || "Failed to update fee.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setSavingFee(false);
    }
  };

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddingAdmin(true);
    try {
      const res = await fetch("/api/admin/sub-admins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAdmin),
      });
      const data = await res.json();
      
      if (data.success) {
        toast.success("New admin added successfully!");
        setAdmins([data.admin, ...admins]);
        setNewAdmin({ fullName: "", email: "", password: "" });
      } else {
        toast.error(data.message || "Failed to add admin.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsAddingAdmin(false);
    }
  };

  const handleDeleteAdmin = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this admin account?")) return;
    try {
      const res = await fetch(`/api/admin/sub-admins/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast.success("Admin deleted successfully.");
        setAdmins(admins.filter(a => a.id !== id));
      } else {
        toast.error(data.message || "Failed to delete admin.");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-100px)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8 p-2 pb-20 sm:p-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
          Admin Settings
        </h1>
        <p className="mt-2 text-zinc-500">
          Manage platform configurations and admin users securely.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        
        {/* Dynamic Pricing Settings */}
        <section className="flex flex-col rounded-3xl border border-zinc-200/50 bg-white/50 p-6 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/50">
          <div className="flex items-center gap-3 border-b border-zinc-100 pb-4 dark:border-white/5">
            <div className="rounded-xl bg-blue-50 p-2.5 dark:bg-blue-500/10">
              <IndianRupee className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Platform Pricing</h2>
              <p className="text-sm text-zinc-500">Configure global platform fees.</p>
            </div>
          </div>

          <div className="mt-6 flex-1">
            <label className="mb-2 block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              Premium Upgrade Fee (₹)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={premiumFee}
                onChange={(e) => setPremiumFee(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-lg font-semibold outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-white/10 dark:bg-black"
              />
              <button
                onClick={handleSaveFee}
                disabled={savingFee}
                className="flex h-[52px] min-w-[120px] items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 font-bold text-white transition hover:opacity-90 active:scale-95 disabled:opacity-70"
              >
                {savingFee ? <Loader2 className="h-5 w-5 animate-spin" /> : "Save"}
              </button>
            </div>
            <p className="mt-3 text-xs text-zinc-500">
              This amount is charged to candidates when they click the "Upgrade to Premium" button via Razorpay.
            </p>
          </div>
        </section>

        {/* Add New Admin */}
        <section className="flex flex-col rounded-3xl border border-zinc-200/50 bg-white/50 p-6 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/50">
          <div className="flex items-center gap-3 border-b border-zinc-100 pb-4 dark:border-white/5">
            <div className="rounded-xl bg-emerald-50 p-2.5 dark:bg-emerald-500/10">
              <Shield className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white">Add Sub-Admin</h2>
              <p className="text-sm text-zinc-500">Create new admin accounts.</p>
            </div>
          </div>

          <form onSubmit={handleAddAdmin} className="mt-6 space-y-4">
            <div>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
                <input
                  required
                  type="text"
                  placeholder="Full Name"
                  value={newAdmin.fullName}
                  onChange={(e) => setNewAdmin({ ...newAdmin, fullName: e.target.value })}
                  className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-white/10 dark:bg-black"
                />
              </div>
            </div>
            <div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
                <input
                  required
                  type="email"
                  placeholder="Email Address"
                  value={newAdmin.email}
                  onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                  className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-white/10 dark:bg-black"
                />
              </div>
            </div>
            <div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
                <input
                  required
                  type="password"
                  placeholder="Password"
                  value={newAdmin.password}
                  onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                  className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-white/10 dark:bg-black"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isAddingAdmin}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-black py-3 font-bold text-white transition hover:bg-zinc-800 disabled:opacity-70 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              {isAddingAdmin ? <Loader2 className="h-5 w-5 animate-spin" /> : <><Plus size={18} /> Create Admin Account</>}
            </button>
          </form>
        </section>

      </div>

      {/* Admin Users List */}
      <section className="rounded-3xl border border-zinc-200/50 bg-white/50 p-6 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/50">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-6">Active Administrators</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-white/10">
                <th className="pb-3 text-left font-semibold text-zinc-500">Name</th>
                <th className="pb-3 text-left font-semibold text-zinc-500">Email</th>
                <th className="pb-3 text-left font-semibold text-zinc-500">Joined</th>
                <th className="pb-3 text-right font-semibold text-zinc-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.id} className="border-b border-zinc-100 transition-colors hover:bg-zinc-50/50 dark:border-white/5 dark:hover:bg-white/[0.02]">
                  <td className="py-4 font-medium text-zinc-900 dark:text-white">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-xs font-bold text-white">
                        {admin.fullName.charAt(0).toUpperCase()}
                      </div>
                      {admin.fullName}
                    </div>
                  </td>
                  <td className="py-4 text-zinc-600 dark:text-zinc-400">{admin.email}</td>
                  <td className="py-4 text-zinc-600 dark:text-zinc-400">{new Date(admin.createdAt).toLocaleDateString()}</td>
                  <td className="py-4 text-right">
                    <button
                      onClick={() => handleDeleteAdmin(admin.id)}
                      className="rounded-lg p-2 text-red-500 transition hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-500/10"
                      title="Remove Admin"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {admins.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-zinc-500">
                    No administrators found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}
