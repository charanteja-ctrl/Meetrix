import React from 'react';
import { QRScannerModal } from '../components/scanner/QRScannerModal';

export const ScannerView: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <QRScannerModal />
    </div>
  );
};
