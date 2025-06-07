// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react-swc/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "/home/project";
function printExternalLink() {
  return {
    name: "print-external-link",
    configureServer(server) {
      server.httpServer?.once("listening", () => {
        const address = "37.63.102.216";
        const port = server.config.server.port || 8080;
        console.log(`\x1B[32m
App is accessible externally at: http://${address}:${port}
\x1B[0m`);
      });
    }
  };
}
var vite_config_default = defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0",
    port: 8080
  },
  plugins: [react(), printExternalLink()],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  build: {
    outDir: "dist",
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          router: ["react-router-dom"],
          ui: ["@radix-ui/react-dialog", "@radix-ui/react-tabs", "@radix-ui/react-toast"],
          maps: ["@react-google-maps/api"],
          supabase: ["@supabase/supabase-js"]
        }
      }
    },
    chunkSizeWarningLimit: 1e3
  },
  esbuild: {
    drop: mode === "production" ? ["console", "debugger"] : []
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIHR5cGUgVml0ZURldlNlcnZlciB9IGZyb20gXCJ2aXRlXCI7XG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0LXN3Y1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcblxuZnVuY3Rpb24gcHJpbnRFeHRlcm5hbExpbmsoKSB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogJ3ByaW50LWV4dGVybmFsLWxpbmsnLFxuICAgIGNvbmZpZ3VyZVNlcnZlcihzZXJ2ZXI6IFZpdGVEZXZTZXJ2ZXIpIHtcbiAgICAgIHNlcnZlci5odHRwU2VydmVyPy5vbmNlKCdsaXN0ZW5pbmcnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFkZHJlc3MgPSAnMzcuNjMuMTAyLjIxNic7XG4gICAgICAgIGNvbnN0IHBvcnQgPSBzZXJ2ZXIuY29uZmlnLnNlcnZlci5wb3J0IHx8IDgwODA7XG4gICAgICAgIGNvbnNvbGUubG9nKGBcXHUwMDFiWzMybVxcbkFwcCBpcyBhY2Nlc3NpYmxlIGV4dGVybmFsbHkgYXQ6IGh0dHA6Ly8ke2FkZHJlc3N9OiR7cG9ydH1cXG5cXHUwMDFiWzBtYCk7XG4gICAgICB9KTtcbiAgICB9LFxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiAoe1xuICBzZXJ2ZXI6IHtcbiAgICBob3N0OiAnMC4wLjAuMCcsXG4gICAgcG9ydDogODA4MCxcbiAgfSxcbiAgcGx1Z2luczogW3JlYWN0KCksIHByaW50RXh0ZXJuYWxMaW5rKCldLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxuICAgIH0sXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgb3V0RGlyOiBcImRpc3RcIixcbiAgICBtaW5pZnk6ICd0ZXJzZXInLFxuICAgIHRlcnNlck9wdGlvbnM6IHtcbiAgICAgIGNvbXByZXNzOiB7XG4gICAgICAgIGRyb3BfY29uc29sZTogdHJ1ZSxcbiAgICAgICAgZHJvcF9kZWJ1Z2dlcjogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgbWFudWFsQ2h1bmtzOiB7XG4gICAgICAgICAgcmVhY3Q6IFsncmVhY3QnLCAncmVhY3QtZG9tJ10sXG4gICAgICAgICAgcm91dGVyOiBbJ3JlYWN0LXJvdXRlci1kb20nXSxcbiAgICAgICAgICB1aTogWydAcmFkaXgtdWkvcmVhY3QtZGlhbG9nJywgJ0ByYWRpeC11aS9yZWFjdC10YWJzJywgJ0ByYWRpeC11aS9yZWFjdC10b2FzdCddLFxuICAgICAgICAgIG1hcHM6IFsnQHJlYWN0LWdvb2dsZS1tYXBzL2FwaSddLFxuICAgICAgICAgIHN1cGFiYXNlOiBbJ0BzdXBhYmFzZS9zdXBhYmFzZS1qcyddLFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDEwMDAsXG4gIH0sXG4gIGVzYnVpbGQ6IHtcbiAgICBkcm9wOiBtb2RlID09PSAncHJvZHVjdGlvbicgPyBbJ2NvbnNvbGUnLCAnZGVidWdnZXInXSA6IFtdLFxuICB9XG59KSk7Il0sCiAgIm1hcHBpbmdzIjogIjtBQUF5TixTQUFTLG9CQUF3QztBQUMxUSxPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBRmpCLElBQU0sbUNBQW1DO0FBSXpDLFNBQVMsb0JBQW9CO0FBQzNCLFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLGdCQUFnQixRQUF1QjtBQUNyQyxhQUFPLFlBQVksS0FBSyxhQUFhLE1BQU07QUFDekMsY0FBTSxVQUFVO0FBQ2hCLGNBQU0sT0FBTyxPQUFPLE9BQU8sT0FBTyxRQUFRO0FBQzFDLGdCQUFRLElBQUk7QUFBQSwwQ0FBdUQsT0FBTyxJQUFJLElBQUk7QUFBQSxRQUFhO0FBQUEsTUFDakcsQ0FBQztBQUFBLElBQ0g7QUFBQSxFQUNGO0FBQ0Y7QUFFQSxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssT0FBTztBQUFBLEVBQ3pDLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQSxTQUFTLENBQUMsTUFBTSxHQUFHLGtCQUFrQixDQUFDO0FBQUEsRUFDdEMsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLElBQ3RDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsUUFBUTtBQUFBLElBQ1IsZUFBZTtBQUFBLE1BQ2IsVUFBVTtBQUFBLFFBQ1IsY0FBYztBQUFBLFFBQ2QsZUFBZTtBQUFBLE1BQ2pCO0FBQUEsSUFDRjtBQUFBLElBQ0EsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLFFBQ04sY0FBYztBQUFBLFVBQ1osT0FBTyxDQUFDLFNBQVMsV0FBVztBQUFBLFVBQzVCLFFBQVEsQ0FBQyxrQkFBa0I7QUFBQSxVQUMzQixJQUFJLENBQUMsMEJBQTBCLHdCQUF3Qix1QkFBdUI7QUFBQSxVQUM5RSxNQUFNLENBQUMsd0JBQXdCO0FBQUEsVUFDL0IsVUFBVSxDQUFDLHVCQUF1QjtBQUFBLFFBQ3BDO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLHVCQUF1QjtBQUFBLEVBQ3pCO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxNQUFNLFNBQVMsZUFBZSxDQUFDLFdBQVcsVUFBVSxJQUFJLENBQUM7QUFBQSxFQUMzRDtBQUNGLEVBQUU7IiwKICAibmFtZXMiOiBbXQp9Cg==
