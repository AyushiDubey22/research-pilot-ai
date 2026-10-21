import "./App.css";
import { useState, useEffect, useRef } from "react";
import {Activity, ArrowDownToLine, ArrowUpRight, BookOpen, CheckCircle2, CircleHelp,
    Clock3,FileText, Files, FolderOpen, LayoutDashboard, LoaderCircle, MessageSquareText, MoreHorizontal, 
    Plus, Search, Settings, ShieldCheck, Sparkles, Upload, XCircle,
} from "lucide-react";
import {CheckAPIHealth} from "./services/api";


const initialDocuments = [
  {
    id: 1,
    name: "Introduction to Retrieval-Augmented Generation",
    type: "Research paper",
    size: "2.4 MB",
    updated: "Today",
    status: "Ready",
  },
  {
    id: 2,
    name: "Large Language Models: A Survey",
    type: "Research paper",
    size: "3.1 MB",
    updated: "Yesterday",
    status: "Ready",
  },
  {
    id: 3,
    name: "Semantic Search and Vector Databases",
    type: "Technical report",
    size: "1.8 MB",
    updated: "Oct 16",
    status: "Ready",
  },
];

const navigation=[
    {label:"Overview",icon:LayoutDashboard},
    {label:"My documents",icon:Files},
    {label:"AI Research Chat",icon:MessageSquareText},    
];

export default function App(){

    const [apiStatus, setApiStatus]=useState("checking");
    const [apiMessage, setApiMessage]=useState("");
    const [activePage,setActivePage]=useState("Overview");
    const [search, setSearch]=useState("");
    const fileInputRef=useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [notice,setNotice]=useState("");

    async function loadApiStatus() {
    setApiStatus("checking");
    setApiMessage("");

    try {
      const data = await CheckAPIHealth();

      if (data.status !== "ok") {
        throw new Error("Unexpected health response");
      }

      setApiStatus("connected");
      setApiMessage(data.service || "API available");
    } catch (error) {
      setApiStatus("error");
      setApiMessage(
        error.message || "Could not connect to the backend"
      );
    }
  }

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const data = await CheckAPIHealth();
        if (ignore) return;
        if (data.status === "ok") {
          setApiStatus("connected");
          setApiMessage(data.service || "API available");
        } else {
          setApiStatus("error");
          setApiMessage("Unexpected health response");
        }
      } catch (error) {
        if (ignore) return;
        setApiStatus("error");
        setApiMessage(error.message || "Could not connect to the backend");
      }
    })();
    return () => {
      ignore = true;
    };
  }, []);

  const filteredDocuments = initialDocuments.filter((doc) =>
    doc.name.toLowerCase().includes(search.toLowerCase())
  );

  function handleFileChange(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      setNotice("Please select a PDF file.");
      setSelectedFile(null);
      event.target.value = "";
      return;
    }

    setSelectedFile(file);
    setNotice(
      `"${file.name}" selected. Backend upload will be added next.`
    );
  }

  function openSection(label) {
    setActivePage(label);

    if (label !== "Overview") {
      setNotice(
        `${label} navigation is ready for the next development stage.`
      );
    } else {
      setNotice("");
    }
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#overview">
          <div className="brand-icon">
            <Sparkles size={22} />
          </div>
          <span>
            Research<span className="brand-light">Pilot</span>
            <small>AI RESEARCH WORKSPACE</small>
          </span>
        </a>

        <div className="workspace-label">WORKSPACE</div>

        <nav className="nav-menu" aria-label="Main navigation">
          {navigation.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className={`nav-item ${
                activePage === label ? "active" : ""
              }`}
              onClick={() => openSection(label)}
            >
              <Icon size={19} />
              <span>{label}</span>
              {label === "My documents" && (
                <span className="nav-count">3</span>
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-tip">
            <div className="tip-icon">
              <Sparkles size={18} />
            </div>
            <strong>Your research, accelerated.</strong>
            <p>
              Bring your documents together and discover insights
              faster.
            </p>
            <button onClick={() => openSection("AI Research Chat")}>
              Explore AI chat <ArrowUpRight size={15} />
            </button>
          </div>

          <button
            className="nav-item utility-link"
            onClick={() => setNotice("Help documentation is coming soon.")}
          >
            <CircleHelp size={18} /> Help & support
          </button>

          <div className="profile">
            <div className="avatar">RP</div>
            <div className="profile-text">
              <strong>Researcher</strong>
              <span>Personal workspace</span>
            </div>
            <button
              className="icon-button profile-menu"
              aria-label="Workspace settings"
              onClick={() => setNotice("Workspace settings are coming soon.")}
            >
              <Settings size={17} />
            </button>
          </div>
        </div>
      </aside>

      <main className="main-panel" id="overview">
        <header className="topbar">
          <div className="breadcrumbs">
            Workspace <span>/</span> <strong>{activePage}</strong>
          </div>

          <div className="topbar-right">
            <div
              className={`api-indicator ${apiStatus}`}
              title={apiMessage}
            >
              {apiStatus === "checking" ? (
                <LoaderCircle size={15} className="spin" />
              ) : apiStatus === "connected" ? (
                <CheckCircle2 size={15} />
              ) : (
                <XCircle size={15} />
              )}
              <span>
                {apiStatus === "checking"
                  ? "Checking API"
                  : apiStatus === "connected"
                    ? "API connected"
                    : "API offline"}
              </span>
            </div>

            <button
              className="icon-button"
              aria-label="Refresh API status"
              onClick={loadApiStatus}
              title="Refresh API status"
            >
              <Activity size={18} />
            </button>

            <div className="top-avatar">R</div>
          </div>
        </header>

        <div className="page-content">
          {activePage === "Overview" ? (
            <>
              <section className="welcome-row">
                <div>
                  <div className="eyebrow">
                    <Sparkles size={14} /> YOUR AI RESEARCH ASSISTANT
                  </div>
                  <h1>Good to see you.</h1>
                  <p className="welcome-description">
                    Your knowledge workspace, all in one place.
                  </p>
                </div>

                <button
                  className="primary-button"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Plus size={18} /> Add document
                </button>
              </section>

              <section className="hero-card">
                <div className="hero-copy">
                  <div className="hero-tag">
                    <Sparkles size={14} /> RESEARCH, REIMAGINED
                  </div>
                  <h2>Turn documents into discoveries.</h2>
                  <p>
                    Upload your research papers, explore ideas, and
                    get evidence-backed answers with AI.
                  </p>
                  <button
                    className="hero-button"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload size={17} /> Upload a PDF
                  </button>
                </div>

                <div className="hero-visual" aria-hidden="true">
                  <div className="orbit orbit-one" />
                  <div className="orbit orbit-two" />
                  <div className="hero-document document-back">
                    <FileText size={28} />
                    <span />
                    <span />
                  </div>
                  <div className="hero-document document-front">
                    <div className="doc-sparkle">
                      <Sparkles size={23} />
                    </div>
                    <span />
                    <span />
                    <span className="short-line" />
                    <div className="doc-highlight" />
                  </div>
                  <div className="floating-check">
                    <CheckCircle2 size={20} />
                  </div>
                </div>
              </section>

              <section className="stats-grid" aria-label="Workspace statistics">
                <article className="stat-card">
                  <div className="stat-top">
                    <span>Total documents</span>
                    <div className="stat-icon purple">
                      <Files size={19} />
                    </div>
                  </div>
                  <div className="stat-value">03</div>
                  <div className="stat-foot">Your research library</div>
                </article>

                <article className="stat-card">
                  <div className="stat-top">
                    <span>AI conversations</span>
                    <div className="stat-icon blue">
                      <MessageSquareText size={19} />
                    </div>
                  </div>
                  <div className="stat-value">00</div>
                  <div className="stat-foot">Ready for your first question</div>
                </article>

                <article className="stat-card">
                  <div className="stat-top">
                    <span>Indexed documents</span>
                    <div className="stat-icon green">
                      <ShieldCheck size={19} />
                    </div>
                  </div>
                  <div className="stat-value">00</div>
                  <div className="stat-foot">AI indexing not implemented yet</div>
                </article>
              </section>

              <section className="documents-section">
                <div className="section-heading">
                  <div>
                    <h2>Recent documents</h2>
                    <p>Pick up where your research left off.</p>
                  </div>

                  <button
                    className="secondary-button"
                    onClick={() => openSection("My documents")}
                  >
                    View all <ArrowUpRight size={16} />
                  </button>
                </div>

                <div className="document-toolbar">
                  <div className="search-box">
                    <Search size={17} />
                    <input
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Search your documents..."
                      aria-label="Search documents"
                    />
                    {search && (
                      <button
                        className="clear-search"
                        onClick={() => setSearch("")}
                        aria-label="Clear search"
                      >
                        <XCircle size={15} />
                      </button>
                    )}
                  </div>
                  <button
                    className="icon-button"
                    aria-label="Document options"
                    title="Document options"
                    onClick={() =>
                      setNotice("Document export will be added later.")
                    }
                  >
                    <ArrowDownToLine size={18} />
                  </button>
                </div>

                <div className="document-list">
                  {filteredDocuments.length > 0 ? (
                    filteredDocuments.map((doc) => (
                      <article className="document-row" key={doc.id}>
                        <div className="pdf-icon">
                          <FileText size={21} />
                        </div>

                        <div className="document-name">
                          <strong>{doc.name}</strong>
                          <span>{doc.type} · {doc.size}</span>
                        </div>

                        <div className="document-date">
                          <Clock3 size={14} /> {doc.updated}
                        </div>

                        <span className="status-pill">
                          <span /> {doc.status}
                        </span>

                        <button
                          className="icon-button row-menu"
                          aria-label={`Options for ${doc.name}`}
                          onClick={() =>
                            setNotice(
                              "Document actions will be connected to the backend later."
                            )
                          }
                        >
                          <MoreHorizontal size={19} />
                        </button>
                      </article>
                    ))
                  ) : (
                    <div className="empty-state">
                      <FolderOpen size={28} />
                      <strong>No matching documents</strong>
                      <span>Try a different search term.</span>
                    </div>
                  )}
                </div>

                <div className="document-footer">
                  <span>Demo data · Not yet stored in the database</span>
                  <span>3 sample documents</span>
                </div>
              </section>

              <section className="bottom-banner">
                <div className="bottom-banner-icon">
                  <BookOpen size={20} />
                </div>
                <div>
                  <strong>Have a question about your research?</strong>
                  <p>
                    AI chat and source citations are coming in the next stage.
                  </p>
                </div>
                <button
                  className="secondary-button"
                  onClick={() => openSection("AI Research Chat")}
                >
                  Explore chat <ArrowUpRight size={16} />
                </button>
              </section>
            </>
          ) : (
            <section className="placeholder-page">
              <div className="placeholder-icon">
                {activePage === "My documents" ? (
                  <Files size={27} />
                ) : (
                  <MessageSquareText size={27} />
                )}
              </div>
              <h1>{activePage}</h1>
              <p>
                This section will become functional as we build the
                document APIs and AI pipeline.
              </p>
              <button
                className="secondary-button"
                onClick={() => openSection("Overview")}
              >
                Back to overview
              </button>
            </section>
          )}

          {notice && (
            <div className="notice" role="status">
              <span>{notice}</span>
              <button
                className="icon-button"
                aria-label="Dismiss message"
                onClick={() => setNotice("")}
              >
                <XCircle size={16} />
              </button>
            </div>
          )}

          {selectedFile && (
            <div className="selected-file">
              <FileText size={17} />
              <span>{selectedFile.name}</span>
              <button
                className="icon-button"
                aria-label="Clear selected file"
                onClick={() => {
                  setSelectedFile(null);
                  setNotice("");
                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }
                }}
              >
                <XCircle size={16} />
              </button>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf,.pdf"
            hidden
            onChange={handleFileChange}
          />

          <footer className="page-footer">
            <span>ResearchPilot © 2026</span>
            <span>Built for better research.</span>
          </footer>
        </div>
      </main>
    </div>
  );
}