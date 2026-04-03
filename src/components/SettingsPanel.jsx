import React, { useRef, useState } from 'react';
import { updateSettings } from '../lib/api';

export default function SettingsPanel({
  settings,
  onSettingsUpdated,
}) {
  const [companyName, setCompanyName] = useState(settings.company_name);
  const [logoPreview, setLogoPreview] = useState(settings.logo_url);
  const [editorOpen, setEditorOpen] = useState(false);
  const fileInputRef = useRef(null);
  const displayedCompanyName = editorOpen ? companyName : settings.company_name;
  const displayedLogo = editorOpen ? logoPreview : settings.logo_url;

  async function handleSubmit(event) {
    event.preventDefault();
    const nextSettings = await updateSettings({
      company_name: companyName,
      logo_url: logoPreview,
    });
    onSettingsUpdated(nextSettings);
    setEditorOpen(false);
  }

  function handleLogoFile(event) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setLogoPreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  }

  return (
    <section className="mt-4">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-[31px] font-normal leading-none text-slate-800">Accounting</h1>
          <p className="mt-1 text-[13px] text-slate-500">
            Manage company details used across the dashboard.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setCompanyName(settings.company_name);
            setLogoPreview(settings.logo_url);
            setEditorOpen(true);
          }}
          className="h-10 rounded-[2px] bg-[#53b700] px-4 text-[13px] font-semibold text-white"
        >
          Edit company
        </button>
      </div>

      <div className="overflow-hidden rounded-[2px] border border-[#dfe3e8] bg-white">
        <div className="border-b border-slate-200 bg-[#fbfcfd] px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[14px] font-semibold text-slate-700">Accounting</p>
              <p className="mt-0.5 text-[12px] text-slate-500">Company profile settings</p>
            </div>
            <p className="text-[12px] text-slate-400">Brand and display details</p>
          </div>
        </div>

        <div className="overflow-hidden">
          <div className="grid grid-cols-[160px_1fr] border-b border-slate-200 bg-slate-50">
            <div className="px-5 py-4 text-[12px] font-semibold text-slate-600">Field</div>
            <div className="px-5 py-4 text-[12px] font-semibold text-slate-600">Value</div>
          </div>
          <div className="grid grid-cols-[160px_1fr] border-b border-slate-200 last:border-b-0">
            <div className="px-5 py-4 text-[13px] text-slate-600">Company name</div>
            <div className="px-5 py-4 text-[13px] text-slate-700">{displayedCompanyName}</div>
          </div>
          <div className="grid grid-cols-[160px_1fr]">
            <div className="px-5 py-4 text-[13px] text-slate-600">Logo</div>
            <div className="px-5 py-4">
              <div className="flex h-[88px] w-[72px] items-center justify-center overflow-hidden rounded-[2px] border border-[#d4d8de] bg-white text-slate-500">
                {displayedLogo ? (
                  <img
                    src={displayedLogo}
                    alt="Company logo"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="text-center">
                    <div className="text-[16px]">+</div>
                    <div className="mt-1 text-[11px] font-semibold">LOGO</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {editorOpen ? (
        <div className="fixed inset-0 z-40 bg-slate-900/20">
          <div className="absolute inset-y-0 right-0 flex w-full max-w-[420px] flex-col border-l border-slate-200 bg-white shadow-[-12px_0_24px_rgba(15,23,42,0.06)]">
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5">
              <div>
                <p className="text-[18px] font-normal text-slate-800">Edit company</p>
                <p className="mt-1 text-[12px] text-slate-500">
                  Update the company name and brand image used in the app.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditorOpen(false)}
                className="text-[13px] font-medium text-slate-500"
              >
                Close
              </button>
            </div>

            <form className="flex h-full flex-col" onSubmit={handleSubmit}>
              <div className="flex-1 space-y-4 overflow-y-auto p-6">
                <div>
                  <span className="mb-1 block text-[13px] font-medium text-slate-600">
                    Logo
                  </span>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex h-[140px] w-[120px] items-center justify-center overflow-hidden rounded-[2px] border border-[#d4d8de] bg-white text-slate-500"
                  >
                    {logoPreview ? (
                      <img
                        src={logoPreview}
                        alt="Company logo"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <div className="text-[18px]">+</div>
                        <div className="mt-1 text-[12px] font-semibold">UPLOAD LOGO</div>
                      </div>
                    )}
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleLogoFile}
                  />
                </div>

                <label className="block">
                  <span className="mb-1 block text-[13px] font-medium text-slate-600">
                    Company name
                  </span>
                  <input
                    value={companyName}
                    onChange={(event) => setCompanyName(event.target.value)}
                    className="h-10 w-full rounded-[2px] border border-slate-300 bg-white px-3 text-[13px] text-slate-700 outline-none"
                  />
                </label>
              </div>

              <div className="flex items-center gap-2 border-t border-slate-200 px-6 py-4">
                <button
                  type="submit"
                  className="h-10 rounded-[2px] bg-[#53b700] px-4 text-[13px] font-semibold text-white"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditorOpen(false)}
                  className="h-10 rounded-[2px] border border-slate-300 px-4 text-[13px] font-medium text-slate-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </section>
  );
}
