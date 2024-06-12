// function fallbackRender({ error, resetErrorBoundary }) {
//   // Call resetErrorBoundary() to reset the error boundary and retry the render.

//   return (
//     <div role="alert" className="p-5 text-center">
//       <p>Something went wrong:</p>
//       <pre style={{ color: "red" }}>{error.message}</pre>
//       <button onClick={() => resetErrorBoundary()} className="button border-0">Try Again</button>
//     </div>
//   );
// }

// export default fallbackRender;