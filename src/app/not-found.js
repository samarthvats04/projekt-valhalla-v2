export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center">
        <img 
          src="/assets/valhalla-logo.png" 
          alt="Logo" 
          className="w-32 h-32 mx-auto mb-8 animate-pulse"
        />
        
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        
        <p className="text-2xl text-gray-300 mb-2">
          This path does not exist. Yet.
        </p>
        
        <p className="text-gray-500 mb-8">
          The destination you seek has not yet been forged. <br/>
          We are currently working to create the trials that lie ahead.
        </p>
        
        <a 
          href="/home"
          className="inline-block bg-white text-black font-bold px-8 py-3 rounded-lg hover:bg-gray-200 transition"
        >
          Return to Valhalla
        </a>
      </div>
    </div>
  );
}