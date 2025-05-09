import React, { useEffect } from "react";

const FooterJS = ({
  pc_dark_layout = "default",
  pc_box_container = "false",
  pc_rtl_layout = "false",
  pc_preset_theme = "",
  font_name = "",
}) => {
  useEffect(() => {
    const scripts = [
      "plugins/popper.min.js",
      "plugins/simplebar.min.js",
      "plugins/bootstrap.min.js",
      "fonts/custom-font.js",
      "pcoded.js",
      "plugins/feather.min.js",
    ];

    scripts.forEach((src) => {
      const script = document.createElement("script");
      script.src = `/assets/js/${src}`;
      script.async = true;
      document.body.appendChild(script);
    });

    if (pc_dark_layout === "default") {
      const isDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
      window.layout_change_default?.();
      window.layout_change?.(isDark ? "dark" : "light");
    } else if (pc_dark_layout === "true") {
      window.layout_change?.("dark");
    } else if (pc_dark_layout === "false") {
      window.layout_change?.("light");
    }

    if (pc_box_container === "true") {
      window.change_box_container?.("true");
    } else if (pc_box_container === "false") {
      window.change_box_container?.("false");
    }

    if (pc_rtl_layout === "true") {
      window.layout_rtl_change?.("true");
    } else if (pc_rtl_layout === "false") {
      window.layout_rtl_change?.("false");
    }

    if (pc_preset_theme !== "") {
      window.preset_change?.(pc_preset_theme);
    }

    if (font_name !== "") {
      window.font_change?.(font_name);
    }
  }, [pc_dark_layout, pc_box_container, pc_rtl_layout, pc_preset_theme, font_name]);

  return null; 
};

export default FooterJS;
