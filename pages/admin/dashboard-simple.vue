<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <h1>Indonesian Airspace Control System</h1>
      <div class="user-info">
        <span>Welcome, Administrator</span>
        <button class="logout-btn" @click="logout">Logout</button>
      </div>
    </div>
    
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon">✈️</div>
        <div class="stat-info">
          <h3>Active Flights</h3>
          <p class="stat-number">247</p>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">👨‍✈️</div>
        <div class="stat-info">
          <h3>ATC Controllers</h3>
          <p class="stat-number">18</p>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">📡</div>
        <div class="stat-info">
          <h3>Active Sectors</h3>
          <p class="stat-number">12</p>
        </div>
      </div>
      
      <div class="stat-card">
        <div class="stat-icon">⚠️</div>
        <div class="stat-info">
          <h3>Alerts</h3>
          <p class="stat-number">3</p>
        </div>
      </div>
    </div>
    
    <div class="dashboard-content">
      <div class="content-card">
        <h2>Recent Activity</h2>
        <div class="activity-list">
          <div class="activity-item">
            <span class="time">14:32</span>
            <span class="description">Flight GA123 entered sector 7</span>
          </div>
          <div class="activity-item">
            <span class="time">14:28</span>
            <span class="description">ATC John Smith logged in</span>
          </div>
          <div class="activity-item">
            <span class="time">14:25</span>
            <span class="description">Weather alert issued for sector 3</span>
          </div>
          <div class="activity-item">
            <span class="time">14:20</span>
            <span class="description">Flight SJ182 requesting clearance</span>
          </div>
        </div>
      </div>
      
      <div class="content-card">
        <h2>System Status</h2>
        <div class="status-list">
          <div class="status-item good">
            <span class="indicator"></span>
            <span>Primary Radar - Online</span>
          </div>
          <div class="status-item good">
            <span class="indicator"></span>
            <span>Secondary Radar - Online</span>
          </div>
          <div class="status-item warning">
            <span class="indicator"></span>
            <span>Communication - Limited</span>
          </div>
          <div class="status-item good">
            <span class="indicator"></span>
            <span>Navigation System - Online</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
function logout() {
  if (confirm('Are you sure you want to logout?')) {
    window.location.href = '/login'
  }
}
</script>

<style scoped>
.dashboard {
  padding: 2rem;
  min-height: 80vh;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.dashboard-header h1 {
  color: white;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-info span {
  color: rgba(255, 255, 255, 0.8);
}

.logout-btn {
  background: rgba(239, 68, 68, 0.2);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 8px;
  padding: 0.5rem 1rem;
  color: #fca5a5;
  cursor: pointer;
  transition: all 0.3s ease;
}

.logout-btn:hover {
  background: rgba(239, 68, 68, 0.3);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.15);
}

.stat-icon {
  font-size: 2rem;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #0c4a6e 0%, #075985 100%);
  border-radius: 12px;
}

.stat-info h3 {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
  font-weight: 500;
}

.stat-number {
  color: white;
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0;
}

.dashboard-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
}

.content-card {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 1.5rem;
  backdrop-filter: blur(10px);
}

.content-card h2 {
  color: white;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.activity-item {
  display: flex;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-item .time {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.8rem;
  min-width: 3rem;
  font-family: monospace;
}

.activity-item .description {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0;
  font-size: 0.9rem;
}

.status-item .indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.status-item.good .indicator {
  background-color: #10b981;
  box-shadow: 0 0 6px rgba(16, 185, 129, 0.6);
}

.status-item.warning .indicator {
  background-color: #f59e0b;
  box-shadow: 0 0 6px rgba(245, 158, 11, 0.6);
}

.status-item.good {
  color: #86efac;
}

.status-item.warning {
  color: #fcd34d;
}

@media (max-width: 768px) {
  .dashboard {
    padding: 1rem;
  }
  
  .dashboard-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .dashboard-header h1 {
    font-size: 1.5rem;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .dashboard-content {
    grid-template-columns: 1fr;
  }
}
</style>
