import { Link } from 'react-router-dom'
import Section from '../../components/section'
import './index.css'

const Home = () => {
	return (
		<Section className="home-section">
			<div>
				<h1>Bem-vindo ao Profanator!</h1>
				<div className="line"></div>
				<p>Um site criado pela comunidade para você!</p>
				<p>Confira abaixo tudo que você encontrará aqui.</p>
			</div>
			<div>
				<h2>Trade</h2>
				<div className="line"></div>
				<p>
					Comercialize seus itens com outros jogadores no nosso <Link to={'/trade'}>Trade</Link>! 🤝
				</p>
				<p>
					<i>Para comprar itens não é necessário ter conta aqui.</i> 🤗
				</p>
			</div>
			<div>
				<h2>Calculator</h2>
				<div className="line"></div>
				<p>
					Está perdido na hora do <i>crafting</i>? Não sabe quantos materiais irá precisar para criar seus itens? 🤔
				</p>
				<p>Seus problemas acabaram! 😯</p>
				<p>
					Apresentamos à você a nossa incrível <Link to={'/calculator'}>Calculadora de Itens</Link>! 😉
				</p>
				<p>
					<strong>Agora você saberá exatamente a quantidade necessária de materiais para criar seus itens!</strong> 🤗
				</p>
			</div>
			<div>
				<h2>Economy</h2>
				<div className="line"></div>
				<p>Quer saber mais sobre como está a economia do Profane? 📊</p>
				<p>
					Em <Link to={'/economy'}>Economy</Link> você encontrará diversos dados históricos de todos os tipos de{' '}
					<strong>itens que são comercializados aqui</strong>.
				</p>
			</div>
		</Section>
	)
}

export default Home
