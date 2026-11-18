import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import API from '../api/axios';
import Loader from '../components/Loader';
import Skeleton from '../components/Skeleton';
import Toast from '../components/Toast';
import ClassesManager from '../components/admin/ClassesManager';
import ReservationsManager from '../components/admin/ReservationsManager';
import UsersManager from '../components/admin/UsersManager';
import MetricCard from '../components/admin/MetricCard';
import ActivityChart from '../components/admin/ActivityChart';
import ActivityTimeline from '../components/admin/ActivityTimeline';

const TABS = ['Clases', 'Reservas', 'Usuarios'];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('Clases');
  const [classes, setClasses] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ message: '', type: '' });

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [clsRes, resRes, usrRes] = await Promise.all([
        API.get('/classes/admin'),
        API.get('/reservations/admin/all'),
        API.get('/users'),
      ]);
      setClasses(clsRes.data.classes || []);
      setReservations(resRes.data.reservations || []);
      setUsers(usrRes.data.users || []);
    } catch {
      setToast({ message: 'No se pudieron cargar los datos del dashboard', type: 'danger' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const confirmedReservations = reservations.filter((res) => res.status === 'confirmed');
  const totalRevenue = reservations.reduce((sum, res) => sum + (res.class?.price || 0), 0);

  if (loading) {
    return (
      <Loader>
        <Skeleton type="table" count={5} />
      </Loader>
    );
  }

  return (
    <motion.div className="container py-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: '' })} />
      <h2 className="fw-bold mb-1">Dashboard Admin</h2>
      <p className="text-muted mb-4">Resumen general y gestión del estudio</p>

      <MetricCard classes={classes} confirmedReservations={confirmedReservations} users={users} totalRevenue={totalRevenue} />
      <ActivityChart reservations={reservations} classes={classes} />
      <ActivityTimeline reservations={reservations} classes={classes} />

      <div className="mt-4">
        <ul className="nav nav-tabs mb-4">
          {TABS.map((tab) => (
            <li className="nav-item" key={tab}>
              <button className={`nav-link ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
                {tab}
              </button>
            </li>
          ))}
        </ul>

        {activeTab === 'Clases' && <ClassesManager classes={classes} onRefresh={fetchData} setToast={setToast} />}
        {activeTab === 'Reservas' && <ReservationsManager reservations={reservations} onRefresh={fetchData} setToast={setToast} />}
        {activeTab === 'Usuarios' && <UsersManager users={users} onRefresh={fetchData} setToast={setToast} />}
      </div>
    </motion.div>
  );
};

export default Dashboard;
