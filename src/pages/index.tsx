import { useEffect, useState } from 'react';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Spinner } from '@/components/Spinner';
import { auth, db } from '@/lib/firebase';

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        fetchAQIData();
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const fetchAQIData = async () => {
    try {
      const response = await fetch('/api/aqi');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error('Error fetching AQI data:', error);
    }
  };

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  const handleLogout = () => {
    signOut(auth);
  };

  if (loading) return <Spinner />;

  if (!user) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        background: '#4a90e2',
        color: 'white',
        textAlign: 'center',
      }}>
        <h1 style={{ fontSize: '32px', marginBottom: '1rem' }}>Welcome to SkyLensAI</h1>
        <p style={{ marginBottom: '1rem' }}>Track & Predict Air Pollution Using Space and AI</p>
        <button onClick={handleLogin} className="button">Sign in with Google</button>
      </div>
    );
  }

  return (
    <main className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>📊 Air Quality Dashboard</h1>
        <button onClick={handleLogout} className="button">Logout</button>
      </div>

      <div className="card">
        <h2 style={{ fontSize: '20px', marginBottom: '1rem' }}>Realtime AQI Forecast</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <Line type="monotone" dataKey="aqi" stroke="#8884d8" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </main>
  );
}
