import React, { ButtonHTMLAttributes, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import timeStringToHours from '../utils/timeStringToHours'
import formatNumberAsCurrencyString from '../utils/formatNumberAsCurrencyString'

function Home() {
  const [isResultHidden, SetIsResultHidden] = useState(true)
  const [devicePower, setDevicePower] = useState(0)
  const [dailyUseHours, setDailyUseHours] = useState('00:00')
  const [energyPrice, setEnergyPrice] = useState(0.58)
  const [pricePerHour, setPricePerHour] = useState(0)

  function calculatePricePerHour(devicePower: number, energyPrice: number) {
    const pricePerHour = devicePower * energyPrice / 1000
    return pricePerHour
  }

  function handleSubmit(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault()
    SetIsResultHidden(false)
  }

  function handleDevicePowerChange(event: React.ChangeEvent<HTMLInputElement>) {
    const devicePowerAsNumber = Number(event.currentTarget.value)

    setDevicePower(devicePowerAsNumber)
    const pricePerHour = calculatePricePerHour(devicePowerAsNumber, energyPrice)
    setPricePerHour(pricePerHour)
  }

  function handleDailyUseHours(event: React.ChangeEvent<HTMLInputElement>) {
    setDailyUseHours(event.currentTarget.value)
  }

  function handleEnergyPriceChange(event: React.ChangeEvent<HTMLInputElement>) {
    const energyPriceAsNumber = Number(event.currentTarget.value)

    setEnergyPrice(energyPriceAsNumber)
    const pricePerHour = calculatePricePerHour(devicePower, energyPriceAsNumber)
    setPricePerHour(pricePerHour)
  }

  return (
    <div className="app-container">
      <header className="page-header">
        <h1 className="page-title">Elektrômetro</h1>
        <h2 className="page-subtitle">Quanto gasto por aparelho?</h2>
      </header>

      <main className="main-content">
        <form className="inputs">
          <label className="input-block" id="device-power-label" htmlFor="device-power-input">
            <span>Potência do aparelho:</span>
            <input
              id="device-power-input"
              type="number"
              value={devicePower}
              onChange={event => handleDevicePowerChange(event)}
            />
          </label>

          <div className="explanations">
            <p>Potência é a quantidade de energia que um aparelho usa ao longo do tempo. Ela é medida em Watts e comumente está escrita no aparelho ou no manual.</p>
            <p><strong>Por exemplo:</strong> Um chuveiro elétrico tem, em média, <strong>5500 W</strong> de potência.</p>
          </div>


          <label className="input-block" id="use-time-label" htmlFor="use-time-input">
            <span>Horas de uso diárias:</span>
            <input
              id="use-time-input"
              type="time"
              value={dailyUseHours}
              onChange={event => handleDailyUseHours(event)}
            />
          </label>

          <div className="explanations">
            <p>A quantidade de horas diárias que o aparelho é usado. Geralmente, o aparelhos em modo stand-by não gastam quantidades consideráveis de energia.</p>
            <p><strong>Por exemplo:</strong> Uma TV ligada à tomada <strong>não</strong> gasta energia considerável se não estiver em uso.</p>
          </div>

          <label className="input-block" id="energy-price-label" htmlFor="energy-price-input">
            <span>Tarifa de energia:</span>
            <input
              id="energy-price-input"
              type="number"
              step={0.01}
              min={0}
              value={energyPrice}
              onChange={event => handleEnergyPriceChange(event)}
            />
          </label>

          <div className="explanations">
            <p>É o preço pago por cada kWh de energia gasta. Geralmente ela está escrita na conta de luz, e pode ser facilmente pesquisada na internet.</p>
            <p><strong>Por exemplo:</strong> A tarifa média no Brasil, em 2020, é de <strong>R$00,58/kWh.</strong></p>
          </div>

          <label htmlFor="submit-button" className="submit-button-label">
            <span className="submit-button-text">Calcular</span>
            <button id="submit-button" onClick={event => { handleSubmit(event) }}>
              <FontAwesomeIcon icon={faArrowRight} className="submit-button-icon" />
            </button>
          </label>
        </form>

        {isResultHidden
          ? null
          :
          <section className="result-box">
            <header className="result-box-header">
              <h1 className="result-box-title">O gasto desse aparelho é de:</h1>
            </header>

            <div className="result-text">
              <span className="price">R${formatNumberAsCurrencyString(pricePerHour)}</span>
              <span>/hora</span>
            </div>
            <div className="result-text">
              <span className="price">R${formatNumberAsCurrencyString(pricePerHour * timeStringToHours(dailyUseHours))}</span>
              <span>/dia</span>
            </div>
            <div className="result-text">
              <span className="price">R${formatNumberAsCurrencyString(pricePerHour * timeStringToHours(dailyUseHours) * 30)}</span>
              <span>/mês</span>
            </div>
          </section>
        }
      </main>
    </div>
  )
}

export default Home
