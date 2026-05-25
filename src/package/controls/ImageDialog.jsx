import React, { useRef, useState } from "react";
import { Image } from "lucide-react";
import { ToolbarButton } from "../toolbars/ToolbarButton.jsx";

export function ImageDialog({ onInsert, onImageUpload, triggerIcon = Image }) {
  const [open, setOpen] = useState(false);
  const [src, setSrc] = useState("");
  const [alt, setAlt] = useState("");
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);

  const insert = (imageSrc) => {
    if (!imageSrc) return;
    onInsert?.({ src: imageSrc, alt, title: alt, caption });
    setSrc("");
    setAlt("");
    setCaption("");
    setOpen(false);
  };

  const upload = async (event) => {
    const file = event.target.files?.[0];
    if (!file || !onImageUpload) return;
    setLoading(true);
    try {
      const uploadedUrl = await onImageUpload(file);
      insert(uploadedUrl);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <ToolbarButton icon={triggerIcon} label="Image" onClick={() => setOpen((value) => !value)} />
      {open ? (
        <div className="novatext-popover absolute left-0 top-10 w-80">
          <input className="h-9 w-full rounded-md border border-slate-200 px-3 text-sm" value={src} onChange={(event) => setSrc(event.target.value)} placeholder="Image URL" />
          <input className="mt-2 h-9 w-full rounded-md border border-slate-200 px-3 text-sm" value={alt} onChange={(event) => setAlt(event.target.value)} placeholder="Alt text" />
          <input className="mt-2 h-9 w-full rounded-md border border-slate-200 px-3 text-sm" value={caption} onChange={(event) => setCaption(event.target.value)} placeholder="Caption" />
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={upload} />
          <div className="mt-3 flex justify-between gap-2">
            <button type="button" className="novatext-button" disabled={!onImageUpload || loading} onClick={() => fileRef.current?.click()}>
              {loading ? "Uploading..." : "Upload"}
            </button>
            <button type="button" className="novatext-button" onClick={() => insert(src)}>Insert</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
