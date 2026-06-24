import React, { useState, useEffect, useRef } from 'react';
import { Phone, Clock, HeartPulse, Stethoscope, ShieldCheck, MapPin, X, Star, Menu, ChevronDown, Activity, AlertCircle, Syringe, ChevronLeft, ChevronRight, AlertTriangle, Wind, Search } from 'lucide-react';
import './App.css';

// WhatsApp icon SVG
const WhatsAppIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51h-.57c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const InstagramIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const FEATURES = [
  { icon: <Clock size={32} />, title: 'Atendimento 24h', desc: 'Prontidão total a qualquer hora do dia ou da noite para o seu pet.' },
  { icon: <HeartPulse size={32} />, title: 'UTI Veterinária', desc: 'Equipamentos de monitoramento contínuo para suporte avançado à vida.' },
  { icon: <ShieldCheck size={32} />, title: 'Segurança Total', desc: 'Ambientes separados e climatizados para cães e gatos, minimizando estresse.' },
  { icon: <Stethoscope size={32} />, title: 'Especialistas de Plantão', desc: 'Equipe veterinária altamente qualificada sempre presente no local.' }
];

const SINTOMAS = [
  { icon: <Wind size={28} />, title: 'Dificuldade para Respirar', desc: 'Respiração ofegante constante, gengivas arroxeadas ou pálidas.' },
  { icon: <AlertTriangle size={28} />, title: 'Convulsões ou Desmaios', desc: 'Tremores descontrolados, perda de consciência ou fraqueza súbita.' },
  { icon: <Activity size={28} />, title: 'Vômitos e Diarreia Constantes', desc: 'Perda rápida de líquidos pode ser fatal para cães e gatos.' },
  { icon: <Search size={28} />, title: 'Traumas e Atropelamentos', desc: 'Mesmo sem sangue visível, podem haver lesões internas graves.' }
];

const TESTIMONIALS = [
  { name: 'Mariana e Bento (Spitz)', text: 'A Dra. Talita foi impecável na cirurgia ortopédica do Bento. A recuperação na internação foi extremamente rápida e a equipe nos deu total suporte via WhatsApp.', initial: 'M' },
  { name: 'Lucas e Nina (Gata)', text: 'O espaço exclusivo para felinos fez toda a diferença. A Nina é muito assustada e pela primeira vez não voltou estressada da internação de 2 dias.', initial: 'L' },
  { name: 'Fernanda e Thor (Golden)', text: 'Estrutura de primeiro mundo! A UTI veterinária foi fundamental para estabilizar o Thor de madrugada. Eles resolveram tudo com competência admirável.', initial: 'F' },
  { name: 'Roberto e Bella (Pug)', text: 'Atendimento 24h real! Chegamos desesperados às 3 da manhã e a equipe de plantão já estava pronta. Triagem rápida e muito profissionalismo.', initial: 'R' },
  { name: 'Juliana e Max (Shih Tzu)', text: 'A estrutura do centro cirúrgico me passou muita segurança. Recebi boletins constantes durante toda a internação. Recomendo de olhos fechados!', initial: 'J' },
  { name: 'Carlos e Mia (Persa)', text: 'Desde a consulta de emergência até a alta, o carinho com a Mia foi excepcional. O monitoramento contínuo na internação salvou a vida dela.', initial: 'C' }
];

const PROCESS_STEPS = [
  { icon: <AlertCircle size={24} />, title: '1. Chegada e Triagem Imediata', desc: 'Sua urgência é a nossa prioridade. Assim que você chega, o paciente é avaliado para classificar a gravidade e estabilizar o quadro inicial.' },
  { icon: <Activity size={24} />, title: '2. Estabilização e Exames', desc: 'Com a estrutura completa, realizamos exames de sangue, imagem e outros procedimentos diagnósticos sem precisar sair da clínica.' },
  { icon: <Syringe size={24} />, title: '3. Tratamento e Internação 24h', desc: 'Seu pet fica em baias individuais, climatizadas e sob monitoramento constante da nossa equipe veterinária especializada.' }
];

const FAQS = [
  { q: 'Preciso marcar horário para o pronto-socorro ou internação?', a: 'Não. Nossa equipe está de plantão 24 horas por dia, 7 dias por semana, exatamente para receber casos de urgência e emergência a qualquer momento.' },
  { q: 'Meu gato é muito assustado, como funciona a internação para ele?', a: 'Temos um ambiente exclusivo e separado apenas para felinos (Medicina Felina). Isso garante zero contato com cães, reduzindo o estresse e acelerando a recuperação do seu gato.' },
  { q: 'Posso visitar meu pet durante a internação?', a: 'Sim! Entendemos que a sua presença é importante. Temos horários de visitação estabelecidos para não interferir nos tratamentos, e você será atualizado constantemente sobre o quadro clínico.' },
  { q: 'Vocês realizam cirurgias de emergência?', a: 'Sim. Contamos com um Centro Cirúrgico Avançado totalmente equipado para realizar desde procedimentos simples até cirurgias complexas de emergência.' }
];

const ESTRUTURA_IMAGES = [
  'Centro-cirurgico-scaled.jpeg',
  'Entrada-bloco-cirurgico-scaled.jpg',
  'IMG_7843-1-scaled.jpg',
  'IMG_7845-scaled.jpg',
  'IMG_7865-1-scaled.jpg',
  'Paramentacao-1-scaled.jpg',
  'CLFEDB~1.JPG', 
  'CLINIC~1.JPG', 
  'CLINIC~2.JPG', 
  'CLINIC~3.JPG', 
  'CLINIC~4.JPG',
  'IMG_7868-scaled.jpg', 
  'PROBLE~1.JPG', 
  'WhatsApp-Image-2025-11-03-at-15.23.11-3-scaled.jpeg', 
  'cromoterapia-para-caes-e-gatos-tratamento-saude-animal-veterinaria.png'
];

const RevealOnScroll = ({ children }) => {
  const domRef = useRef();
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setVisible(true);
      }
    }, { threshold: 0.1 });

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div ref={domRef} className={`reveal ${isVisible ? 'active' : ''}`}>
      {children}
    </div>
  );
};

function App() {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [showAllImages, setShowAllImages] = useState(false);

  const phoneLink = "tel:+5511995588000";
  const waLink = "https://wa.me/5511995588000?text=Ol%C3%A1%21+%C3%89+uma+emerg%C3%AAncia%2C+preciso+de+atendimento+imediato+para+o+meu+pet.";
  const mapsLink = "https://maps.app.goo.gl/bRsEsHSfg3dXuuaQ7";
  const instagramLink = "https://www.instagram.com/petivavet/";
  const facebookLink = "https://www.facebook.com/petivavet";

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(true), 12000);
    return () => clearTimeout(timer);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const prevImage = (e) => {
    e.stopPropagation();
    setLightboxIndex(prev => prev === 0 ? ESTRUTURA_IMAGES.length - 1 : prev - 1);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setLightboxIndex(prev => prev === ESTRUTURA_IMAGES.length - 1 ? 0 : prev + 1);
  };

  const displayedImages = showAllImages ? ESTRUTURA_IMAGES : ESTRUTURA_IMAGES.slice(0, 6);

  return (
    <div className="app">
      {/* Header Wrapper */}
      <header className="sticky-header">
        {/* Top Banner Plantão */}
        <div className="top-banner">
          <div className="pulse-dot"></div>
          <span>PLANTÃO ATIVO: Equipe médica de prontidão neste momento.</span>
        </div>

        {/* Navbar with Mobile Menu */}
        <nav>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 24px' }}>
          <div className="logo" style={{ display: 'flex', alignItems: 'center' }}>
            <a href="#">
              <img src="/assets/logo_petiva/logo-cropped.png" alt="Petiva Logo" style={{ height: '60px', objectFit: 'contain' }} onError={(e) => { e.target.style.display='none'; e.target.parentElement.innerHTML='<span style="font-size: 1.5rem; font-weight: bold; color: var(--primary);">petiva</span>'; }} />
            </a>
          </div>
          
          <div className="nav-links desktop-only">
            <a href="#estrutura">Estrutura</a>
            <a href="#processo">Como Funciona</a>
            <a href="#sobre">Sobre Nós</a>
            <a href="#contato">Localização</a>
            <a href={waLink} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
              <Phone size={16} /> Plantão 24h
            </a>
          </div>

          <button className="hamburger" onClick={() => setMenuOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${menuOpen ? 'open' : ''}`} onClick={closeMenu}></div>
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <button className="mobile-close" onClick={closeMenu}><X size={28} /></button>
        <img src="/assets/logo_petiva/logo-cropped.png" alt="Petiva" style={{ height: '50px', objectFit: 'contain', alignSelf: 'flex-start', marginBottom: '20px' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '1.2rem' }}>
          <a href="#estrutura" onClick={closeMenu} style={{ color: 'var(--text-dark)' }}>Estrutura</a>
          <a href="#processo" onClick={closeMenu} style={{ color: 'var(--text-dark)' }}>Como Funciona</a>
          <a href="#sobre" onClick={closeMenu} style={{ color: 'var(--text-dark)' }}>Sobre Nós</a>
          <a href="#contato" onClick={closeMenu} style={{ color: 'var(--text-dark)' }}>Localização & Contato</a>
        </div>
        <a href={waLink} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ marginTop: 'auto', width: '100%' }}>
          <Phone size={20} /> Plantão 24h
        </a>
      </div>
      </header>

      {/* Hero Section Grid */}
      <section className="hero">
        <div className="container">
          <RevealOnScroll>
            <div className="hero-grid">
              <div className="hero-content">
                <div className="hero-badge">🚨 Serviço de Urgência & Emergência</div>
                <h1>Internação Veterinária 24h: Cuidado <span>Intensivo</span> para o seu Pet.</h1>
                <p>Infraestrutura de ponta e equipe especializada de prontidão. Não perca tempo, em casos de emergência cada segundo importa.</p>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <a href={waLink} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ padding: '20px 40px', fontSize: '1.2rem' }}>
                    <WhatsAppIcon size={24} color="#fff" /> Fale com a gente agora mesmo
                  </a>
                </div>
              </div>
              <div className="hero-image">
                <img src="/assets/IMG_0239.jpg" alt="Emergência Petiva" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1628009368231-7bb7cbcb8122?auto=format&fit=crop&q=80"; }} />
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Sintomas de Alerta */}
      <section className="sintomas">
        <div className="container">
          <RevealOnScroll>
            <div className="section-header">
              <h2>Quando procurar o <span>Pronto-Socorro?</span></h2>
              <p>Fique atento aos sinais. Um atendimento rápido salva a vida do seu pet.</p>
            </div>
          </RevealOnScroll>

          <div className="sintomas-grid">
            {SINTOMAS.map((sintoma, idx) => (
              <RevealOnScroll key={idx}>
                <div className="sintoma-card">
                  <div className="loc-icon" style={{ width: 48, height: 48, borderRadius: '50%' }}>
                    {sintoma.icon}
                  </div>
                  <div>
                    <h4>{sintoma.title}</h4>
                    <p style={{ margin: 0, fontSize: '0.9rem' }}>{sintoma.desc}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Process / Timeline Section */}
      <section className="process" id="processo">
        <div className="container">
          <RevealOnScroll>
            <div className="section-header">
              <h2>Como funciona nossa <span>Urgência</span></h2>
              <p>Um processo ágil e seguro desenvolvido para salvar vidas.</p>
            </div>
          </RevealOnScroll>
          
          <div className="process-steps">
            {PROCESS_STEPS.map((step, idx) => (
              <RevealOnScroll key={idx}>
                <div className="step-card">
                  <div className="step-number">{idx + 1}</div>
                  <div className="step-content">
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="container">
          <div className="features-grid">
            {FEATURES.map((feat, idx) => (
              <RevealOnScroll key={idx}>
                <div className="feature-card">
                  <div className="feature-icon">{feat.icon}</div>
                  <h3>{feat.title}</h3>
                  <p>{feat.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll>
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <a href={waLink} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>
                <WhatsAppIcon size={20} color="#fff" /> Fale conosco
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Structure Gallery */}
      <section className="structure" id="estrutura">
        <div className="container">
          <RevealOnScroll>
            <div className="section-header">
              <h2>Conheça nossa <span>Estrutura</span></h2>
              <p>O ambiente perfeito e seguro para a recuperação do seu melhor amigo.</p>
            </div>
          </RevealOnScroll>
          
          <div className="gallery-grid">
            {displayedImages.map((imgName, idx) => (
              <RevealOnScroll key={idx}>
                <div 
                  className="gallery-item" 
                  onClick={() => setLightboxIndex(idx)}
                >
                  <img src={`/assets/estrutura/${imgName}`} alt={`Estrutura Petiva ${idx}`} loading="lazy" />
                </div>
              </RevealOnScroll>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            {!showAllImages && ESTRUTURA_IMAGES.length > 6 ? (
              <button 
                onClick={() => setShowAllImages(true)} 
                className="btn btn-primary"
                style={{ background: 'transparent', border: '2px solid var(--secondary)', color: 'var(--secondary)' }}
              >
                Ver Mais Fotos
              </button>
            ) : showAllImages && ESTRUTURA_IMAGES.length > 6 ? (
              <button 
                onClick={() => {
                  setShowAllImages(false);
                  document.getElementById('estrutura').scrollIntoView({ behavior: 'smooth' });
                }} 
                className="btn btn-primary"
                style={{ background: 'var(--secondary)', color: 'white', border: '2px solid var(--secondary)' }}
              >
                Ver Menos Fotos
              </button>
            ) : null}
          </div>
        </div>
      </section>

      {/* CTA Banner Central */}
      <section style={{ background: 'var(--primary)', color: 'white', padding: '30px 0' }}>
        <div className="container">
          <RevealOnScroll>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
              <div style={{ textAlign: 'left', maxWidth: '600px' }}>
                <h2 style={{ fontSize: '1.8rem', marginBottom: '8px', color: 'white' }}>Não espere o quadro agravar.</h2>
                <p style={{ fontSize: '1.1rem', opacity: 0.9, margin: 0 }}>A rapidez no primeiro atendimento faz toda a diferença para a sobrevivência do seu pet.</p>
              </div>
              <a href={waLink} target="_blank" rel="noreferrer" className="btn" style={{ background: '#25D366', color: 'white', padding: '16px 32px', fontSize: '1.1rem', boxShadow: '0 5px 15px rgba(37, 211, 102, 0.3)', border: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <WhatsAppIcon size={24} color="#fff" /> Chamar Emergência Agora
              </a>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Lightbox Carousel */}
      <div className={`lightbox ${lightboxIndex !== null ? 'active' : ''}`} onClick={() => setLightboxIndex(null)}>
        <div className="lightbox-content" onClick={e => e.stopPropagation()}>
          <button className="lightbox-close" onClick={() => setLightboxIndex(null)}><X size={40} /></button>
          
          {lightboxIndex !== null && (
            <>
              <button className="lightbox-nav" onClick={prevImage}><ChevronLeft size={32} /></button>
              <div className="lightbox-img-wrapper">
                <img src={`/assets/estrutura/${ESTRUTURA_IMAGES[lightboxIndex]}`} alt="Estrutura Petiva Ampliada" />
              </div>
              <button className="lightbox-nav" onClick={nextImage}><ChevronRight size={32} /></button>
            </>
          )}
        </div>
      </div>

      {/* About Section */}
      <section className="about" id="sobre">
        <div className="container">
          <div className="about-grid">
            <RevealOnScroll>
              <div className="about-image" style={{background: '#e2e8f0', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b'}}>
                <img src="/assets/foto-dra.jpg" alt="Dra. Talita Oliveira Rodrigues" onError={(e) => { e.target.style.display='none'; e.target.parentElement.innerHTML='<span style="text-align: center; padding: 20px;">Coloque a foto da Dra na pasta public/assets com o nome foto-dra.jpg</span>'; }} />
              </div>
            </RevealOnScroll>
            <RevealOnScroll>
              <div className="about-content">
                <span className="role">Diretora Técnica & Fundadora</span>
                <h2>Dra. Talita Oliveira Rodrigues</h2>
                <p>Médica Veterinária formada pela PUC Minas, especialista em Cirurgia Geral, Medicina Felina e Endoscopia Veterinária.</p>
                
                <blockquote className="quote">
                  "Fundamos o Petiva com foco em gestão de processos assistenciais seguros, eficientes e centrados no bem-estar animal absoluto. Seu pet é único, nosso cuidado também."
                </blockquote>

                <div className="stats-grid">
                  <div className="stat-card">
                    <h4>15</h4>
                    <p>Especialidades Disponíveis Integradas</p>
                  </div>
                  <div className="stat-card" style={{ background: 'var(--secondary)'}}>
                    <h4 style={{color: 'white'}}>100%</h4>
                    <p>Estrutura Completa de Ponta</p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials" id="depoimentos">
        <div className="container">
          <RevealOnScroll>
            <div className="section-header">
              <h2>O que dizem os nossos <span>pacientes</span></h2>
            </div>
          </RevealOnScroll>
          
          <RevealOnScroll>
            <div className="testimonials-slider-container">
              <div className="testimonials-track">
                {[...TESTIMONIALS, ...TESTIMONIALS].map((test, idx) => (
                  <div className="testimonial-card" key={idx}>
                    <div className="stars">
                      {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#fbbf24" stroke="#fbbf24" />)}
                    </div>
                    <p className="testimonial-text">{test.text}</p>
                    <div className="testimonial-author">
                      <div className="author-avatar">{test.initial}</div>
                      <div className="author-info">
                        <h5>{test.name}</h5>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq" id="faq">
        <div className="container">
          <RevealOnScroll>
            <div className="section-header">
              <h2>Perguntas <span>Frequentes</span></h2>
              <p>Tire suas dúvidas rapidamente sobre o nosso atendimento de urgência.</p>
            </div>
          </RevealOnScroll>

          <div className="faq-list">
            {FAQS.map((faq, idx) => (
              <RevealOnScroll key={idx}>
                <div className={`faq-item ${openFaq === idx ? 'open' : ''}`}>
                  <div className="faq-question" onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
                    {faq.q}
                    <ChevronDown className="faq-icon" size={20} />
                  </div>
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="location" id="contato">
        <div className="container">
          <RevealOnScroll>
            <div className="section-header" style={{ color: 'white' }}>
              <h2 style={{ color: 'white' }}>Localização & <span>Contato</span></h2>
              <p style={{ color: 'rgba(255,255,255,0.8)' }}>Sua clínica de confiança para emergências, de portas abertas.</p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <div className="location-grid">
              <div className="location-info">
                <h2>Venha nos visitar</h2>
                <p>Nossa estrutura está preparada 24 horas por dia para receber o seu pet.</p>

                <div className="location-cards">
                  <div className="loc-card">
                    <div className="loc-icon"><MapPin size={24} /></div>
                    <div>
                      <h5>Endereço</h5>
                      <p>R. Santa Isabel, 68 - Vila Buarque<br/>São Paulo - SP, 01221-010</p>
                    </div>
                  </div>

                  <div className="loc-card">
                    <div className="loc-icon"><Clock size={24} /></div>
                    <div>
                      <h5>Horário de Funcionamento</h5>
                      <p style={{ color: 'var(--secondary)', fontWeight: 'bold' }}>Plantão 24 Horas</p>
                      <p>Aberto todos os dias, domingos e feriados.</p>
                    </div>
                  </div>

                  <div className="loc-card">
                    <div className="loc-icon"><WhatsAppIcon size={24} color="var(--secondary)" /></div>
                    <div>
                      <h5>Contato Direto</h5>
                      <p>Telefone / Emergência: (11) 99558-8000</p>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '32px' }}>
                  <h5 style={{ color: 'var(--primary)', marginBottom: '16px' }}>Siga nossas Redes Sociais</h5>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <a href={instagramLink} target="_blank" rel="noreferrer" style={{ width: 40, height: 40, background: '#f8fafc', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.2s', color: '#e1306c' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                      <InstagramIcon size={24} />
                    </a>
                    <a href={facebookLink} target="_blank" rel="noreferrer" style={{ width: 40, height: 40, background: '#f8fafc', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.2s', color: '#1877f2' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                      <FacebookIcon size={24} />
                    </a>
                  </div>
                </div>

                <div style={{ marginTop: '40px', background: 'rgba(41, 182, 185, 0.1)', padding: '24px', borderRadius: '12px', border: '1px solid rgba(41, 182, 185, 0.2)' }}>
                  <h4 style={{ color: 'var(--primary)', marginBottom: '12px' }}>Ainda tem dúvidas ou é urgente?</h4>
                  <p style={{ fontSize: '0.9rem', marginBottom: '16px', color: 'var(--text-dark)' }}>Fale diretamente com nossa equipe de triagem médica. Estamos prontos para orientar você agora.</p>
                  <a href={waLink} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    <WhatsAppIcon size={20} color="#fff" /> Fale com a gente agora mesmo!
                  </a>
                </div>
              </div>

              <div className="map-wrapper">
                <iframe 
                  title="Google Maps"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.720021314836!2d-46.64879812292177!3d-23.5425703609055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59a7d1a2d1ad%3A0x1ad66b4dd1480552!2sCentro%20Veterin%C3%A1rio%20Petiva%20%7C%20Cl%C3%ADnica%20Veterin%C3%A1ria%20em%20Vila%20Buarque%20%7C%20Veterin%C3%A1rios%20em%20SP!5e0!3m2!1spt-BR!2sbr!4v1782320459471!5m2!1spt-BR!2sbr" 
                  allowFullScreen="" 
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                ></iframe>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Footer Minimal */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <RevealOnScroll>
              <img src="/assets/logo_petiva/Logo-petiva-transparente.png" alt="Petiva" className="footer-logo" onError={(e) => {e.target.style.display='none'; e.target.parentElement.insertAdjacentHTML('afterbegin', '<h3>petiva</h3>');}} />
              <p style={{ opacity: 0.8, maxWidth: '500px', margin: '0 auto' }}>
                Centro de cuidado intensivo e especializado. Estrutura hospitalar avançada com atendimento humanizado para o seu pet.
              </p>
            </RevealOnScroll>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Petiva. Todos os direitos reservados. Responsável Técnica: Dra. Talita Oliveira Rodrigues</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp (Desktop only via CSS) */}
      <div className="floating-whatsapp">
        <div className={`whatsapp-tooltip ${showTooltip ? 'show' : ''}`}>
          <button className="tooltip-close" onClick={() => setShowTooltip(false)}><X size={14} /></button>
          <p>Ei! Você precisa de ajuda?</p>
        </div>
        <a href={waLink} target="_blank" rel="noreferrer" className="whatsapp-btn">
          <WhatsAppIcon size={32} color="#fff" />
        </a>
      </div>

      {/* Mobile Sticky Bottom Bar (Mobile only via CSS) */}
      <div className="mobile-bottom-bar">
        <a href={phoneLink} className="mobile-btn btn-call">
          <Phone size={20} /> Ligar
        </a>
        <a href={waLink} target="_blank" rel="noreferrer" className="mobile-btn btn-wa">
          <WhatsAppIcon size={20} color="#fff" /> WhatsApp
        </a>
      </div>
    </div>
  );
}

export default App;
