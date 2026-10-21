import "./App.css";
import React, { useState, useEffect, useRef } from "react";
import {Activity, ArrowDownToLine, ArrowUpRight, BookOpen, CheckCircle2, ChevronDown, CircleHelp,
    Clock3,FileText, Files, FolderOpen, LayoutDashboard, LoaderCircle, MessageSquareText, MoreHorizontal, 
    Plus, Search, Settings, SheildCheck, Sparkles, Upload, XCircle,
} from "lucide-react";
import {CheckAPIHealth} from "./services/api";
import {Loader} from "";

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

    const [apiMessage, setApiMessage]=useState("");
    const [activePage,setActivePage]=useState("Overview");
    const [search, setSearch]=useState("");
    const fileInputRef=useRef(null);
    const [seletedFile,setSelectedFile]=useState("");
    const [notice,setNotice]=useState("");

    return (
        <div className="App">
            <h1>Welcome to the App</h1>
        </div>
    );
}