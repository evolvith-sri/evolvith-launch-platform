'use client';

import { useState } from 'react';

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  badge?: string;
  description: string;
  size?: string;
  children?: FileNode[];
}

interface PackageFileTreeProps {
  productId: string;
}

export function PackageFileTree({ productId }: PackageFileTreeProps) {
  const [selectedFile, setSelectedFile] = useState<FileNode>({
    name: 'blueprint.json',
    type: 'file',
    badge: 'SCHEMA',
    description: 'System specification schema defining operational taxonomy, unit economic boundaries, and API integration targets.',
    size: '4.2 KB',
  });

  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    'src': true,
    'docs': false,
    'sops': false,
  });

  const toggleFolder = (folderName: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderName]: !prev[folderName],
    }));
  };

  const packageTree: FileNode[] = [
    {
      name: 'src',
      type: 'folder',
      description: 'Core executable Python operating system engine and CLI diagnostic entry points.',
      children: [
        {
          name: 'engine.py',
          type: 'file',
          badge: 'CODE',
          description: 'Primary operating system workflow execution engine and state machine logic.',
          size: '6.8 KB',
        },
        {
          name: 'cli.py',
          type: 'file',
          badge: 'CLI',
          description: 'Command-line diagnostic tool for health checks, telemetry verification, and config ingestion.',
          size: '3.4 KB',
        },
        {
          name: '__init__.py',
          type: 'file',
          badge: 'INIT',
          description: 'Module package initialization file.',
          size: '0.2 KB',
        },
      ],
    },
    {
      name: 'blueprint.json',
      type: 'file',
      badge: 'SCHEMA',
      description: 'System specification schema defining operational taxonomy, unit economic boundaries, and API integration targets.',
      size: '4.2 KB',
    },
    {
      name: 'cert_manifest.json',
      type: 'file',
      badge: 'GOVERNANCE',
      description: 'Internal Quality Gate QG4 certification manifest with automated AST audit checksums.',
      size: '1.8 KB',
    },
    {
      name: 'install.py',
      type: 'file',
      badge: 'INSTALLER',
      description: 'Automated 48-hour quickstart installer script for environment provisioning and dependency binding.',
      size: '5.1 KB',
    },
    {
      name: 'API_SPEC.md',
      type: 'file',
      badge: 'API',
      description: 'Standardized REST endpoints, webhook hooks, and event payload schemas for CRM/ERP/warehouse integration.',
      size: '8.4 KB',
    },
    {
      name: 'SOP_MANUAL.md',
      type: 'file',
      badge: 'RACI',
      description: 'Standard Operating Procedures manual and operational RACI matrix for business unit leaders.',
      size: '12.6 KB',
    },
    {
      name: 'README_QUICKSTART.md',
      type: 'file',
      badge: 'DOCS',
      description: 'Phase 1 to Phase 4 step-by-step 48-hour rapid deployment runbook.',
      size: '6.2 KB',
    },
    {
      name: 'LICENSE_EULA.md',
      type: 'file',
      badge: 'LICENSE',
      description: 'Perpetual commercial license grant for internal business use within the purchasing organization.',
      size: '3.9 KB',
    },
    {
      name: 'docs',
      type: 'folder',
      description: 'Comprehensive operational documentation suite.',
      children: [
        {
          name: 'EXECUTIVE_GUIDE.md',
          type: 'file',
          badge: 'DOCS',
          description: 'High-level architectural summary and business transformation framework for executive leaders.',
          size: '9.1 KB',
        },
        {
          name: 'IMPLEMENTATION_PLAYBOOK.md',
          type: 'file',
          badge: 'DOCS',
          description: 'Detailed technical implementation playbook for DevOps and integration engineers.',
          size: '14.2 KB',
        },
        {
          name: 'USER_MANUAL.md',
          type: 'file',
          badge: 'DOCS',
          description: 'End-user operational guide for day-to-day workflow execution.',
          size: '11.5 KB',
        },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
        <div>
          <span className="text-xs font-mono uppercase text-cyan-400 font-bold tracking-wider">
            Representative Distribution Package Structure
          </span>
          <h4 className="text-lg font-bold font-heading text-white mt-1">
            Inside {productId.toUpperCase()}_v1.0.0.zip
          </h4>
        </div>
        <span className="text-xs font-mono text-gray-400 bg-white/5 px-3 py-1 rounded-lg border border-white/10 self-start sm:self-auto">
          Format: .zip Package (Python + Schemas + SOPs)
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Interactive Tree View */}
        <div className="lg:col-span-6 bg-[#070A10] p-5 rounded-2xl border border-white/10 font-mono text-xs space-y-2 select-none shadow-inner">
          <div className="text-gray-400 pb-2 border-b border-white/5 flex items-center justify-between">
            <span className="text-[11px] font-bold text-gray-300">📦 {productId.toUpperCase()}_v1.0.0/</span>
            <span className="text-[10px] text-gray-500">CLICK FILE TO INSPECT</span>
          </div>

          <div className="space-y-1.5 pt-1">
            {packageTree.map((item, idx) => (
              <div key={idx} className="space-y-1">
                {item.type === 'folder' ? (
                  <div>
                    <button
                      onClick={() => toggleFolder(item.name)}
                      className="w-full flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white transition-colors text-left"
                      aria-expanded={expandedFolders[item.name]}
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-cyan-400 text-xs">
                          {expandedFolders[item.name] ? '📂' : '📁'}
                        </span>
                        <span className="font-bold text-gray-200">{item.name}/</span>
                      </span>
                      <span className="text-[10px] text-gray-500 font-mono">
                        {expandedFolders[item.name] ? 'COLLAPSE' : 'EXPAND'}
                      </span>
                    </button>

                    {expandedFolders[item.name] && item.children && (
                      <div className="pl-6 border-l border-white/10 ml-3 space-y-1 my-1">
                        {item.children.map((child, cIdx) => (
                          <button
                            key={cIdx}
                            onClick={() => setSelectedFile(child)}
                            className={`w-full flex items-center justify-between py-1 px-2 rounded-lg transition-all text-left ${
                              selectedFile.name === child.name
                                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                                : 'hover:bg-white/5 text-gray-400 hover:text-gray-200'
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <span className="text-gray-500">📄</span>
                              <span>{child.name}</span>
                            </span>
                            {child.badge && (
                              <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-gray-400 border border-white/5">
                                {child.badge}
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => setSelectedFile(item)}
                    className={`w-full flex items-center justify-between py-1.5 px-2 rounded-lg transition-all text-left ${
                      selectedFile.name === item.name
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                        : 'hover:bg-white/5 text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-gray-500">📄</span>
                      <span className="font-medium text-gray-300">{item.name}</span>
                    </span>
                    {item.badge && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-gray-400 border border-white/5">
                        {item.badge}
                      </span>
                    )}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Selected File Details Box */}
        <div className="lg:col-span-6 glass-panel p-6 rounded-2xl border border-cyan-500/30 bg-surface/90 space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">📄</span>
              <div>
                <h5 className="font-mono text-sm font-bold text-white">{selectedFile.name}</h5>
                <span className="text-[10px] font-mono text-gray-400">
                  Deliverable Class: <span className="text-cyan-400 font-semibold">{selectedFile.badge || 'ARTIFACT'}</span>
                </span>
              </div>
            </div>
            {selectedFile.size && (
              <span className="text-[11px] font-mono text-gray-400 bg-white/5 px-2.5 py-1 rounded border border-white/5">
                {selectedFile.size}
              </span>
            )}
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-[10px] font-mono uppercase text-gray-500 block font-bold">
                Architectural Role & Scope
              </span>
              <p className="text-xs text-gray-300 leading-relaxed mt-1">
                {selectedFile.description}
              </p>
            </div>

            <div className="bg-surface/50 p-3.5 rounded-xl border border-white/5 space-y-1.5 text-xs text-gray-300 font-mono">
              <span className="text-[10px] uppercase text-emerald-400 font-bold block">
                Fulfillment Standard
              </span>
              <p className="text-[11px] text-gray-400">
                ✓ Full local runtime package with inspectable source delivered in release archive.<br />
                ✓ Compatible with internal Python 3.9+ environments.<br />
                ✓ Verified under Quality Gate QG4 manufacturing scan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
