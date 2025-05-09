import React from 'react';
import Header from '../../../dist/layouts/Header';

const Dashboard = () => {
  return (
    
    <div className="pc-container">
      <div className="pc-content">
        <div className="row">
          {[
            {
              title: 'Total Page Views',
              value: '4,42,236',
              badge: { text: '59.3%', className: 'bg-light-primary border border-primary', icon: 'ti ti-trending-up' },
              note: 'You made an extra 35,000 this year',
              highlight: '35,000',
              textClass: 'text-primary',
            },
            {
              title: 'Total Users',
              value: '78,250',
              badge: { text: '70.5%', className: 'bg-light-success border border-success', icon: 'ti ti-trending-up' },
              note: 'You made an extra 8,900 this year',
              highlight: '8,900',
              textClass: 'text-success',
            },
            {
              title: 'Total Order',
              value: '18,800',
              badge: { text: '27.4%', className: 'bg-light-warning border border-warning', icon: 'ti ti-trending-down' },
              note: 'You made an extra 1,943 this year',
              highlight: '1,943',
              textClass: 'text-warning',
            },
            {
              title: 'Total Sales',
              value: '$35,078',
              badge: { text: '27.4%', className: 'bg-light-danger border border-danger', icon: 'ti ti-trending-down' },
              note: 'You made an extra $20,395 this year',
              highlight: '$20,395',
              textClass: 'text-danger',
            },
          ].map((card, index) => (
            <div className="col-md-6 col-xl-3" key={index}>
              <div className="card">
                <div className="card-body">
                  <h6 className="mb-2 f-w-400 text-muted">{card.title}</h6>
                  <h4 className="mb-3">
                    {card.value} <span className={`badge ${card.badge.className}`}><i className={card.badge.icon}></i> {card.badge.text}</span>
                  </h4>
                  <p className="mb-0 text-muted text-sm">You made an extra <span className={card.textClass}>{card.highlight}</span> this year</p>
                </div>
              </div>
            </div>
          ))}

          <div className="col-md-12 col-xl-8">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h5 className="mb-0">Unique Visitor</h5>
              <ul className="nav nav-pills justify-content-end mb-0">
                <li className="nav-item" role="presentation">
                  <button className="nav-link" data-bs-toggle="pill" data-bs-target="#chart-tab-home" type="button">Month</button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="nav-link active" data-bs-toggle="pill" data-bs-target="#chart-tab-profile" type="button">Week</button>
                </li>
              </ul>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="tab-content">
                  <div className="tab-pane" id="chart-tab-home">
                    <div id="visitor-chart-1"></div>
                  </div>
                  <div className="tab-pane show active" id="chart-tab-profile">
                    <div id="visitor-chart"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-12 col-xl-4">
            <h5 className="mb-3">Income Overview</h5>
            <div className="card">
              <div className="card-body">
                <h6 className="mb-2 f-w-400 text-muted">This Week Statistics</h6>
                <h3 className="mb-3">$7,650</h3>
                <div id="income-overview-chart"></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
