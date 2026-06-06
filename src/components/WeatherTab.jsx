import { useState } from 'react'
import { geocodeCity, fetchWeather, weatherIcons } from '../api'
import styles from './WeatherTab.module.css'

export default function WeatherTab({ apiKey }) {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)
  const [meta, setMeta] = useState(null)

  async function handleSearch() {
    if (!apiKey) { setError('Enter a valid API key (starts with wai_) at the top.'); return }
    if (!query.trim()) { setError('Enter a city name.'); return }
    setError(null)
    setLoading(true)
    setData(null)
    try {
      const geo = await geocodeCity(query.trim())
      const weather = await fetchWeather(apiKey, geo.lat, geo.lon)
      setMeta(geo)
      setData(weather)
    } catch (e) {
      setError(e.message || 'Request failed. Check your API key and try again.')
    }
    setLoading(false)
  }

  const cur = data?.current || data?.current_weather || {}
  const daily = data?.daily || data?.forecast || data?.forecast_days || []
  const aiSummary = data?.ai_summary || data?.summary || data?.ai || ''

  const temp = cur.temp !== undefined ? Math.round(cur.temp) : cur.temperature !== undefined ? Math.round(cur.temperature) : null
  const feels = cur.feels_like !== undefined ? Math.round(cur.feels_like) : null
  const humidity = cur.humidity ?? null
  const wind = cur.wind_speed !== undefined ? Math.round(cur.wind_speed) : cur.windspeed !== undefined ? Math.round(cur.windspeed) : null
  const uv = cur.uvi ?? cur.uv_index ?? null
  const vis = cur.visibility !== undefined ? (cur.visibility / 1000).toFixed(1) : null
  const desc = cur.weather?.[0]?.description || cur.condition || cur.description || ''
  const code = cur.weather?.[0]?.id || cur.weathercode || ''

  const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className={styles.wrap}>
      <div className={styles.searchRow}>
        <input
          className={styles.input}
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
          placeholder="City name, e.g. Nairobi"
        />
        <button className={styles.btn} onClick={handleSearch} disabled={loading}>
          {loading ? '...' : 'Search'}
        </button>
      </div>

      {error && <div className={styles.error}>⚠ {error}</div>}

      {loading && (
        <div className={styles.loading}>
          <div className={styles.spinner} />
          <span className={styles.loadingText}>Fetching weather data…</span>
        </div>
      )}

      {!loading && !data && !error && (
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>🌍</div>
          <p>Enter a city to pull live weather data with AI-powered insights.</p>
        </div>
      )}

      {data && meta && (
        <>
          <div className={styles.mainCard}>
            <div className={styles.mainTop}>
              <div>
                <div className={styles.cityName}>{meta.city}</div>
                <div className={styles.cityMeta}>
                  {meta.country} · {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                </div>
                <div className={styles.condition}>{weatherIcons(code)} {desc}</div>
              </div>
              <div className={styles.tempBlock}>
                <span className={styles.tempBig}>{temp ?? '—'}</span>
                <span className={styles.tempUnit}>°C</span>
                {feels !== null && <div className={styles.feelsLike}>Feels {feels}°</div>}
              </div>
            </div>

            <div className={styles.statsGrid}>
              {humidity !== null && (
                <div className={styles.statBox}>
                  <div className={styles.statLabel}>Humidity</div>
                  <div className={styles.statVal}>{humidity}<span>%</span></div>
                </div>
              )}
              {wind !== null && (
                <div className={styles.statBox}>
                  <div className={styles.statLabel}>Wind</div>
                  <div className={styles.statVal}>{wind}<span> m/s</span></div>
                </div>
              )}
              {uv !== null && (
                <div className={styles.statBox}>
                  <div className={styles.statLabel}>UV Index</div>
                  <div className={styles.statVal}>{uv}</div>
                </div>
              )}
              {vis !== null && (
                <div className={styles.statBox}>
                  <div className={styles.statLabel}>Visibility</div>
                  <div className={styles.statVal} style={{ fontSize: 14 }}>{vis} km</div>
                </div>
              )}
            </div>
          </div>

          {aiSummary && (
            <div className={styles.aiCard}>
              <div className={styles.aiLabel}>AI Summary</div>
              <p className={styles.aiText}>{aiSummary}</p>
            </div>
          )}

          {daily.length > 0 && (
            <>
              <div className={styles.sectionLabel}>7-day forecast</div>
              <div className={styles.forecastRow}>
                {daily.slice(0, 7).map((day, i) => {
                  const dt = day.dt ? new Date(day.dt * 1000) : day.date ? new Date(day.date) : null
                  const label = i === 0 ? 'Today' : dt ? DAY_NAMES[dt.getDay()] : `D${i + 1}`
                  const hi = day.temp?.max !== undefined ? Math.round(day.temp.max) : day.temp !== undefined ? Math.round(day.temp) : day.tempmax !== undefined ? Math.round(day.tempmax) : '—'
                  const lo = day.temp?.min !== undefined ? Math.round(day.temp.min) : day.tempmin !== undefined ? Math.round(day.tempmin) : '—'
                  const dc = day.weather?.[0]?.id || day.weathercode || ''
                  return (
                    <div key={i} className={styles.fcItem}>
                      <div className={styles.fcDay}>{label}</div>
                      <div className={styles.fcIcon}>{weatherIcons(dc)}</div>
                      <div className={styles.fcHi}>{hi}°</div>
                      <div className={styles.fcLo}>{lo}°</div>
                    </div>
                  )
                })}
              </div>
            </>
          )}
        </>
      )}
    </div>
  )
}
