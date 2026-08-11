import { useState } from "react";

function Settings() {
  const [notifications, setNotifications] =
    useState(true);

  const [emailAlerts, setEmailAlerts] =
    useState(true);

  return (
    <div className="max-w-4xl mx-auto space-y-8">

      <div>

        <p className="text-blue-400 font-semibold">
          ACCOUNT
        </p>

        <h1 className="text-3xl md:text-4xl font-bold mt-2">
          Settings ⚙️
        </h1>

        <p className="text-slate-400 mt-2">
          Manage your CareerPilot preferences.
        </p>

      </div>

      {/* Notifications */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-7">

        <h2 className="text-xl font-bold">
          🔔 Notifications
        </h2>

        <div className="mt-6 space-y-5">

          <label className="flex items-center justify-between gap-5">

            <div>
              <p className="font-semibold">
                Push Notifications
              </p>

              <p className="text-slate-400 text-sm mt-1">
                Receive updates about your job applications.
              </p>
            </div>

            <input
              type="checkbox"
              checked={notifications}
              onChange={(e) =>
                setNotifications(e.target.checked)
              }
              className="w-5 h-5 accent-blue-600"
            />

          </label>

          <label className="flex items-center justify-between gap-5">

            <div>
              <p className="font-semibold">
                Email Alerts
              </p>

              <p className="text-slate-400 text-sm mt-1">
                Receive important career updates by email.
              </p>
            </div>

            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) =>
                setEmailAlerts(e.target.checked)
              }
              className="w-5 h-5 accent-blue-600"
            />

          </label>

        </div>

      </div>

      {/* Preferences */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-7">

        <h2 className="text-xl font-bold">
          🎨 Preferences
        </h2>

        <div className="mt-6">

          <label className="block text-sm text-slate-300 mb-2">
            Language
          </label>

          <select className="w-full bg-slate-900 border border-white/10 rounded-xl px-5 py-3 text-white">
            <option>English</option>
          </select>

        </div>

      </div>

      <button className="px-7 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold">
        Save Settings
      </button>

    </div>
  );
}

export default Settings;