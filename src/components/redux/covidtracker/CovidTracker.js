import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Activity,
  HeartPulse,
  RefreshCw,
  ShieldCheck,
  Skull,
  UsersRound,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  fetchCountries,
  fetchCovidData,
  setSelectedCountry,
} from "../../../redux/covidTrackerSlice";
import "./CovidTracker.css";

const numberFormatter = new Intl.NumberFormat("tr-TR");
const compactFormatter = new Intl.NumberFormat("tr-TR", { notation: "compact", maximumFractionDigits: 1 });

function formatUpdated(timestamp) {
  if (!timestamp) {
    return "Guncelleme bilgisi yok";
  }

  return new Intl.DateTimeFormat("tr-TR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(timestamp));
}

function formatChartDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "short" }).format(date);
}

function StatCard({ title, value, updated, icon: Icon, tone }) {
  return (
    <article className={`covid-stat-card ${tone}`}>
      <div className="covid-stat-topline">
        <span className="covid-stat-icon"><Icon size={20} aria-hidden="true" /></span>
        <span className="covid-stat-title">{title}</span>
      </div>
      <strong className="covid-stat-value">{numberFormatter.format(value || 0)}</strong>
      <span className="covid-stat-updated">Güncellendi: {formatUpdated(updated)}</span>
    </article>
  );
}

export default function CovidTracker() {
  const dispatch = useDispatch();
  const {
    countries,
    selectedCountry,
    summary,
    chartData,
    countriesStatus,
    dataStatus,
    error,
  } = useSelector((state) => state.covidTracker);

  useEffect(() => {
    const request = dispatch(fetchCountries());
    return () => request.abort();
  }, [dispatch]);

  useEffect(() => {
    const request = dispatch(fetchCovidData(selectedCountry));
    return () => request.abort();
  }, [dispatch, selectedCountry]);

  const handleCountryChange = (event) => {
    dispatch(setSelectedCountry(event.target.value));
  };

  const handleRetry = () => {
    dispatch(fetchCountries());
    dispatch(fetchCovidData(selectedCountry));
  };

  const locationName = selectedCountry === "world" ? "Dünya Geneli" : selectedCountry;

  return (
    <main className="covid-page">
      <div className="covid-dashboard">
        <header className="covid-header">
          <div>
            <p className="covid-eyebrow">GLOBAL HEALTH MONITOR</p>
            <h1>COVID-19 Tracker</h1>
            <p className="covid-header-copy">Raporlanan vaka ve sağlık verilerine genel bakış.</p>
          </div>
          <div className="covid-live-indicator"><span /> Veri paneli</div>
        </header>

        {error && (
          <div className="covid-error" role="alert">
            <span>{error}</span>
            <button type="button" onClick={handleRetry} aria-label="Verileri tekrar yükle">
              <RefreshCw size={17} aria-hidden="true" /> Tekrar dene
            </button>
          </div>
        )}

        <section className="covid-stats" aria-label={`${locationName} COVID-19 istatistikleri`}>
          <StatCard title="Toplam enfekte" value={summary?.cases} updated={summary?.updated} icon={UsersRound} tone="cases" />
          <StatCard title="İyileştirilen" value={summary?.recovered} updated={summary?.updated} icon={HeartPulse} tone="recovered" />
          <StatCard title="Vefat" value={summary?.deaths} updated={summary?.updated} icon={Skull} tone="deaths" />
          <StatCard title="Aktif vaka" value={summary?.active} updated={summary?.updated} icon={Activity} tone="active" />
        </section>

        <section className="covid-country-control" aria-label="Ülke seçimi">
          <div>
            <span className="covid-section-kicker">VERİ KAPSAMI</span>
            <h2>{locationName}</h2>
          </div>
          <label htmlFor="covid-country-select">Ülke seç</label>
          <select
            id="covid-country-select"
            value={selectedCountry}
            onChange={handleCountryChange}
            disabled={countriesStatus !== "succeeded"}
          >
            <option value="world">Dünya geneli</option>
            {countries.map((country) => <option key={country} value={country}>{country}</option>)}
          </select>
        </section>

        <section className="covid-chart-section" aria-labelledby="covid-chart-title">
          <div className="covid-chart-heading">
            <div>
              <span className="covid-section-kicker">RAPORLANAN TARİH ARALIĞI</span>
              <h2 id="covid-chart-title">Vaka eğilimi</h2>
              {chartData.length > 0 && (
                <p className="covid-date-range">
                  {formatChartDate(chartData[0].date)} – {formatChartDate(chartData[chartData.length - 1].date)}
                </p>
              )}
            </div>
            <div className="covid-chart-legend" aria-label="Grafik serileri">
              <span><i className="legend-cases" />Enfekte</span>
              <span><i className="legend-recovered" />İyileştirilen</span>
              <span><i className="legend-deaths" />Vefat</span>
              <span><i className="legend-active" />Aktif</span>
            </div>
          </div>

          <div className="covid-chart" aria-busy={dataStatus === "loading"}>
            {dataStatus === "loading" && !chartData.length ? (
              <div className="covid-chart-message">Veriler yükleniyor...</div>
            ) : chartData.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 12, right: 12, left: 4, bottom: 4 }}>
                  <defs>
                    <linearGradient id="casesFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#e47758" stopOpacity={0.24} />
                      <stop offset="100%" stopColor="#e47758" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="#e8e9e7" strokeDasharray="3 5" vertical={false} />
                  <XAxis dataKey="date" tickFormatter={formatChartDate} tickLine={false} axisLine={false} minTickGap={28} />
                  <YAxis tickFormatter={compactFormatter.format} tickLine={false} axisLine={false} width={52} />
                  <Tooltip
                    labelFormatter={formatChartDate}
                    formatter={(value, name) => [numberFormatter.format(value), name]}
                    contentStyle={{ borderRadius: 8, border: "1px solid #e6e8e7", boxShadow: "0 8px 24px rgba(24, 35, 40, .1)" }}
                  />
                  <Area type="monotone" dataKey="cases" name="Enfekte" stroke="#e47758" strokeWidth={2.5} fill="url(#casesFill)" />
                  <Area type="monotone" dataKey="recovered" name="Iyilestirilen" stroke="#39a78b" strokeWidth={2} fill="none" />
                  <Area type="monotone" dataKey="deaths" name="Vefat" stroke="#6e7481" strokeWidth={2} fill="none" />
                  <Area type="monotone" dataKey="active" name="Aktif" stroke="#e2ac45" strokeWidth={2} fill="none" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="covid-chart-message">Grafik verisi bulunamadı.</div>
            )}
          </div>
          <p className="covid-source-note">
            Kaynak: disease.sh / Johns Hopkins CSSE. Grafik API'nin sağladığı son 30 rapor gününü gösterir; bazı ülkelerde bildirimler güncel olmayabilir.
          </p>
        </section>

        <footer className="covid-footer">
          <ShieldCheck size={16} aria-hidden="true" />
          <span>Bilgilendirme amaçlıdır; sağlık tavsiyesi değildir.</span>
        </footer>
      </div>
    </main>
  );
}