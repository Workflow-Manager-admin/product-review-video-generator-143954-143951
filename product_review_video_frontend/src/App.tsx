/* eslint-env browser */
/* global alert, setTimeout */

import React, { useState, useCallback } from "react";
import { Player } from "@remotion/player";
import { HelloWorld } from "./HelloWorld";

// Theme colors from configuration
const COLORS = {
  primary: "#1976D2",
  secondary: "#424242",
  accent: "#FFC107",
  background: "#fff",
  text: "#232323",
};

const PRODUCT_VIDEO_DURATION = 150;
const PRODUCT_VIDEO_FPS = 30;
const PRODUCT_VIDEO_WIDTH = 1280;
const PRODUCT_VIDEO_HEIGHT = 720;

// ==== UI COMPONENTS ====

// PUBLIC_INTERFACE
function ProductDetailsForm({
  productDetails,
  setProductDetails,
}: {
  productDetails: ProductDetails;
  setProductDetails: (d: ProductDetails) => void;
}) {
  return (
    <form
      style={{
        display: "flex",
        gap: 24,
        background: COLORS.background,
        padding: 24,
        borderRadius: 12,
        boxShadow: "0 2px 12px #0001",
        marginBottom: 24,
      }}
      autoComplete="off"
    >
      <TextInput
        label="Product Name"
        value={productDetails.name}
        onChange={(v) => setProductDetails({ ...productDetails, name: v })}
        required
      />
      <TextInput
        label="Description"
        value={productDetails.description}
        onChange={(v) => setProductDetails({ ...productDetails, description: v })}
        required
      />
      <TextInput
        label="Product Image URL"
        value={productDetails.image}
        onChange={(v) => setProductDetails({ ...productDetails, image: v })}
        required
      />
    </form>
  );
}

// PUBLIC_INTERFACE
function ReviewForm({
  review,
  setReview,
  onSubmit,
}: {
  review: Review;
  setReview: (r: Review) => void;
  onSubmit: () => void;
}) {
  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        background: COLORS.background,
        padding: 24,
        borderRadius: 12,
        boxShadow: "0 2px 12px #0001",
        minWidth: 340,
      }}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      autoComplete="off"
    >
      <h2 style={{ color: COLORS.primary, margin: 0 }}>Write a Review</h2>
      <TextInput
        label="Reviewer Name"
        value={review.author}
        onChange={(v) => setReview({ ...review, author: v })}
        required
      />
      <TextArea
        label="Review"
        value={review.comment}
        onChange={(v) => setReview({ ...review, comment: v })}
        required
      />
      <div>
        <button
          type="submit"
          style={{
            background: COLORS.accent,
            color: COLORS.secondary,
            fontWeight: 600,
            border: "none",
            borderRadius: 6,
            padding: "12px 20px",
            cursor: "pointer",
            transition: "background 0.2s",
          }}
        >
          Generate Video Preview
        </button>
      </div>
    </form>
  );
}

// PUBLIC_INTERFACE
function VideoPreview({
  productDetails,
  review, // eslint-disable-line @typescript-eslint/no-unused-vars
  previewKey,
  downloading,
  setDownloading,
}: {
  productDetails: ProductDetails;
  review: Review;
  previewKey: string;
  downloading: boolean;
  setDownloading: (b: boolean) => void;
}) {
  // Props pass to composition (including product+review)
  const compProps = {
    titleText: productDetails.name || "Your Product Name",
    titleColor: COLORS.primary,
    logoColor1: COLORS.primary,
    logoColor2: COLORS.accent,
    // Additional fields for the custom video composition can be added here
    // ...for product image, review, etc.
  };

  // Download Render Handler
  const handleDownload = useCallback(() => {
    setDownloading(true);

    // For simplicity, we'll just notify the user.
    // In practical production Remotion usage, a backend service is needed for actual mp4/video rendering and download.
    alert(
      "Video rendering & download requires Remotion rendering backend or CLI.\nIn web preview, use Remotion Studio to render/download."
    );
    setTimeout(() => setDownloading(false), 2000);
  }, [setDownloading]);

  return (
    <div
      style={{
        flex: 1,
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 2px 24px #0002",
        background: "#f9fafd",
        padding: 16,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2 style={{ color: COLORS.secondary, marginTop: 0 }}>Video Preview</h2>
      <div style={{ width: 800, background: "#fff", borderRadius: 8 }}>
        <Player
          key={previewKey}
          component={HelloWorld}
          durationInFrames={PRODUCT_VIDEO_DURATION}
          fps={PRODUCT_VIDEO_FPS}
          compositionWidth={PRODUCT_VIDEO_WIDTH}
          compositionHeight={PRODUCT_VIDEO_HEIGHT}
          style={{
            marginBottom: 16,
            width: 800,
            height: 450,
            background: "#fff",
            borderRadius: 8,
            boxShadow: "0 1px 8px #0001",
          }}
          inputProps={compProps}
          controls
        />
      </div>
      <button
        onClick={handleDownload}
        style={{
          marginTop: 16,
          border: "none",
          background: COLORS.primary,
          color: "#fff",
          borderRadius: 6,
          fontWeight: 500,
          fontSize: 16,
          padding: "10px 24px",
          cursor: "pointer",
        }}
        disabled={downloading}
      >
        {downloading ? "Preparing Download..." : "Download Video"}
      </button>
      <p style={{ fontSize: 13, color: "#888", marginTop: 10 }}>
        * To render and download videos, use the Remotion CLI or a backend.<br />
        This preview demonstrates the video content live.
      </p>
    </div>
  );
}

// === Simple Inputs ===

// PUBLIC_INTERFACE
function TextInput({
  label,
  value,
  onChange,
  required,
}: {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <div style={{ flex: 1, minWidth: 220 }}>
      <label
        style={{
          fontWeight: 600,
          fontSize: 15,
          marginBottom: 3,
          color: COLORS.secondary,
          display: "block",
        }}
      >
        {label}
      </label>
      <input
        type="text"
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          fontSize: 15,
          padding: "8px 12px",
          borderRadius: 6,
          border: `1px solid #e2e2e2`,
          boxShadow: "0 1px 2px #0001",
          outlineColor: COLORS.accent,
        }}
      />
    </div>
  );
}

// PUBLIC_INTERFACE
function TextArea({
  label,
  value,
  onChange,
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <div style={{ flex: 1 }}>
      <label
        style={{
          fontWeight: 600,
          fontSize: 15,
          marginBottom: 3,
          color: COLORS.secondary,
          display: "block",
        }}
      >
        {label}
      </label>
      <textarea
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        style={{
          width: "100%",
          fontSize: 15,
          padding: "8px 12px",
          borderRadius: 6,
          border: `1px solid #e2e2e2`,
          boxShadow: "0 1px 2px #0001",
          outlineColor: COLORS.primary,
          resize: "vertical",
        }}
      />
    </div>
  );
}

// ==== DATA TYPES ====

type ProductDetails = {
  name: string;
  description: string;
  image: string;
};

type Review = {
  author: string;
  comment: string;
};

// ==== MAIN APP ====

/**
 * PUBLIC_INTERFACE
 * Main App component for the Product Review Video Generator.
 * - Inputs: Product details and user review form.
 * - Shows: Preview of Remotion video with submitted info, allows download.
 */
const App: React.FC = () => {
  // State for product and review forms
  const [productDetails, setProductDetails] = useState<ProductDetails>({
    name: "",
    description: "",
    image: "",
  });
  const [review, setReview] = useState<Review>({
    author: "",
    comment: "",
  });

  const [videoKey, setVideoKey] = useState<string>(String(Date.now()));
  const [showPreview, setShowPreview] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // On review submit, update the preview key to re-render Player.
  const handleGeneratePreview = () => {
    setVideoKey(String(Date.now())); // Forces Player remount and re-render
    setShowPreview(true);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f7f8fa",
        color: COLORS.text,
        fontFamily:
          "SF Pro Text, Inter, Helvetica Neue, Arial, sans-serif",
        padding: 0,
        margin: 0,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          margin: "0 auto",
          maxWidth: 1200,
          padding: "2rem 1.5rem",
        }}
      >
        <h1
          style={{
            marginBottom: 10,
            color: COLORS.primary,
            fontWeight: 900,
            letterSpacing: -1.2,
            fontSize: 38,
          }}
        >
          Product Review Video Generator
        </h1>
        <p
          style={{
            marginTop: 0,
            marginBottom: 30,
            color: "#666",
            fontSize: 19,
          }}
        >
          Enter your product details and review, preview your video, and download!
        </p>
        {/* Layout: Product details on top, below: Preview & Review side-by-side */}
        <ProductDetailsForm
          productDetails={productDetails}
          setProductDetails={setProductDetails}
        />

        <div style={{ display: "flex", gap: 32, alignItems: "flex-start" }}>
          <div style={{ flex: 3, minWidth: 850 }}>
            {showPreview ? (
              <VideoPreview
                productDetails={productDetails}
                review={review}
                previewKey={videoKey}
                downloading={downloading}
                setDownloading={setDownloading}
              />
            ) : (
              <div
                style={{
                  display: "flex",
                  minHeight: 380,
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#fff",
                  borderRadius: 12,
                  boxShadow: "0 1px 12px #0001",
                  color: "#bbb",
                  fontSize: 22,
                  fontWeight: 400,
                  letterSpacing: "-.008em",
                  textAlign: "center",
                }}
              >
                <span>
                  Enter product and review details, then generate a preview!
                </span>
              </div>
            )}
          </div>
          <div style={{ flex: 1, minWidth: 340 }}>
            <ReviewForm
              review={review}
              setReview={setReview}
              onSubmit={handleGeneratePreview}
            />
          </div>
        </div>
      </div>
      <footer
        style={{
          marginTop: 30,
          padding: "18px 0 10px",
          background: "#f7f8fa",
          textAlign: "center",
          fontSize: 14,
          color: "#888",
        }}
      >
        Built with <strong>Remotion</strong> | Modern Light UI | &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default App;
