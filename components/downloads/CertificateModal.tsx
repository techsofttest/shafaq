"use client";

import Image from 'next/image';

export interface Certificate {
  image: string;
  title: string;
  fileUrl: string;
  fileType: 'pdf' | 'image';
}

interface CertificateModalProps {
  selectedIndex: number | null;
  certificates: Certificate[];
  onClose: () => void;
  onNext: (e: React.MouseEvent) => void;
  onPrev: (e: React.MouseEvent) => void;
  animating: boolean;
}

export default function CertificateModal({
  selectedIndex,
  certificates,
  onClose,
  onNext,
  onPrev,
  animating,
}: CertificateModalProps) {
  if (selectedIndex === null || !certificates[selectedIndex]) return null;

  const currentCert = certificates[selectedIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/80 backdrop-blur-sm">
      {/* Overlay to close */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Folder Container */}
      <div className="relative w-full max-w-[420px] md:max-w-[480px] z-10">
        {/* Slanted Step Tab with Certificate Name */}
        <div
          className="w-[90%] h-[45px] bg-[#1C1C1C] rounded-tl-xl relative flex justify-between items-center px-6 pr-12 border-t border-l border-gray-800"
          style={{ clipPath: 'polygon(0 0, calc(100% - 35px) 0, 100% 100%, 0 100%)' }}
        >
          <span className="text-white text-xs sm:text-sm font-bold uppercase tracking-wider truncate max-w-[240px]">
            {currentCert.title}
          </span>
          {/* Close Button on the step */}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-[#FE0002] transition-colors p-1"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Main Content Area */}
        <div className="relative w-full h-[82vh] max-h-[720px] min-h-[540px] bg-[#1C1C1C] rounded-b-xl rounded-tr-xl shadow-[0_30px_60px_rgba(0,0,0,0.6)] flex flex-col items-center justify-between p-4 md:p-6 border-b border-l border-r border-t border-gray-800">

          {/* Slider Controls */}
          <button
            onClick={onPrev}
            className="absolute left-2 md:-left-16 top-1/2 -translate-y-1/2 bg-[#121212] hover:bg-[#FE0002] text-white p-3 rounded-full transition-colors z-20 shadow-xl border border-gray-800"
            aria-label="Previous Certificate"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <button
            onClick={onNext}
            className="absolute right-2 md:-right-16 top-1/2 -translate-y-1/2 bg-[#121212] hover:bg-[#FE0002] text-white p-3 rounded-full transition-colors z-20 shadow-xl border border-gray-800"
            aria-label="Next Certificate"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          {/* Stacked Papers (Tall Certificate Viewport) */}
          <div className="relative w-full flex-1 mt-1 mb-12">
            {/* Bottom Paper */}
            <div className="absolute inset-0 bg-white rounded shadow-sm border border-gray-300 transform -rotate-3 scale-[0.96] translate-y-3 opacity-30"></div>
            {/* Middle Paper */}
            <div className="absolute inset-0 bg-white rounded shadow-sm border border-gray-300 transform rotate-2 scale-[0.98] translate-x-2 translate-y-1 opacity-70"></div>

            {/* Top Paper (Active Certificate) */}
            <div
              className={`relative w-full h-full bg-white rounded shadow-lg overflow-hidden p-2 border border-gray-100 z-10 transition-all duration-200 ease-in-out ${animating
                ? 'opacity-0 scale-95'
                : 'opacity-100 scale-100'
                }`}
            >
              <Image
                src={currentCert.image}
                alt={currentCert.title}
                fill
                sizes="(max-width: 768px) 100vw, 600px"
                className="object-contain"
              />
            </div>
          </div>

          {/* Action Buttons at Bottom (View PDF & Download PDF) */}
          <div className="absolute bottom-4 left-0 w-full flex items-center justify-center gap-3 z-20 px-4">
            {/* View PDF Button */}
            <a
              href={currentCert.image}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#121212] hover:bg-black text-white px-4 py-2 rounded-full transition-colors shadow-lg flex items-center gap-2 text-xs font-semibold border border-gray-700"
              title="Open in new browser tab"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
              <span>View {currentCert.fileType === "pdf" ? "PDF" : "Image"}</span>
            </a>

            {/* Download PDF Button */}
            <a
              href={currentCert.fileUrl}
              download
              className="bg-[#FE0002] hover:bg-red-700 text-white px-4 py-2 rounded-full transition-colors shadow-lg flex items-center gap-2 text-xs font-semibold"
              title={`Download ${currentCert.title}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              <span>Download {currentCert.fileType === "pdf" ? "PDF" : "Image"}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
