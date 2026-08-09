# Plano de Implementação: Landing Page Imersiva CTRLS (Controlados pra Salvar)

Este plano descreve a criação de uma experiência web premium e interativa para a banda gospel **CTRLS (Controlados pra Salvar)**, com visual cinematográfico em tons de preto, dourado e branco, física 3D de câmera por movimento de mouse, menu orbital 3D com 13 itens interativos, e 7 seções completas e responsivas.

---

## 🎨 Conceito Visual & Design System
- **Paleta de Cores**:
  - Fundo Deep Obsidian `#070709` / `#0d0d12`
  - Dourado Celestial `#d4af37`, `#f39c12`, `#ffdf00` (com gradients glowing e efeitos neon metalizados)
  - Branco Puro `#ffffff` e Prata Estelar `#e0e0e0`
- **Tipografia**: Google Fonts *Outfit* (títulos futuristas e elegantes) & *Inter* (corpo de texto legível).
- **Estilo**: Glassmorphism premium, iluminação cinematográfica, partículas de poeira estelar/luz divina em HTML5 Canvas 2D/3D, brilhos dourados dinâmicos ao passar o mouse.

---

## 🛸 Funcionalidades Principais

### 1. Hero Section com Efeito 3D de Câmera & Menu Orbital
- **Efeito 3D Tilt & Parallax**: A imagem principal da banda reage em tempo real à rotação do mouse ($X, Y$) calculando ângulos de perspectiva `perspective(1000px) rotateX(...) rotateY(...) translateZ(...)`.
- **Menu Orbital 3D**:
  - 13 esferas/badges flutuantes dispostas em uma elipse orbital 3D girando suavemente ao redor dos 4 integrantes:
    `YouTube`, `Spotify`, `Instagram`, `TikTok`, `Facebook`, `LinkedIn`, `Apple Music`, `Amazon Music`, `YouTube Music`, `Cifras Club`, `Loja`, `Agenda`, `Contato`.
  - Cada item tem física orbital, cálculo de profundidade ($Z$-index e escale conforme a posição na órbita), pausa/destaque ao passar o mouse, aproximação com efeito *scale 3D* e glow dourado intenso.
  - Links diretos com rolagem suave para as seções internas (`#loja`, `#agenda`, `#contato`) ou redirecionamento externo direto.

### 2. Seções da Página
1. **Hero Section**: Apresentação principal, slogan "Controlados pra Salvar", player de áudio flutuante rápido, botão CTA "Ouvir Novo Álbum" e Menu Orbital 3D.
2. **Sobre a Banda**: História inspiradora, propósito e cards interativos glassmorphism dos 4 integrantes (Vocal/Violão, Guitarra, Baixo/Sintetizador, Bateria) com bio e redes sociais individuais.
3. **Músicas em Destaque**: Player áudio customizado imersivo com playlist dos últimos lançamentos, barra de progresso com animação de frequência de áudio (Audio Visualizer Canvas) e links rápidos para Spotify, Apple Music, Deezer, etc.
4. **Vídeos Recentes**: Grid cinematográfico de videoclipes e ministrações ao vivo com player modal pop-up HD.
5. **Agenda de Eventos**: Tabela estilizada de próximos shows e turnês por país/estado, com indicador de status ("Ingressos Disponíveis", "Esgotado", "Entrada Franca") e botões interativos "Garantir Ingresso" / "Como Chegar".
6. **Loja Oficial (Merch)**: Vitrine de produtos exclusivos (Camisetas oversized CTRLS, Moletons, Bonés, Vinil/CD Deluxe) com filtro de categoria, carrinho interativo flutuante e modal de visualização rápida do produto.
7. **Contato & Convites**: Formulário elegante glassmorphism com validação em tempo real para convites da igreja/eventos, assessoria de imprensa e FAQ expansível em sanfona.

---

## 🛠️ Estrutura do Projeto

O projeto será criado em `C:\Users\andre.feitosa\.gemini\antigravity\scratch\gospel-band-landing` com a seguinte estrutura:

```
gospel-band-landing/
├── index.html               # Estrutura semântica HTML5 com SEO & Open Graph
├── css/
│   ├── main.css             # Design system, variáveis, glassmorphism e utilitários
│   ├── hero-3d.css          # Animações 3D, elipse orbital e efeitos de luz
│   └── components.css       # Seções, player de áudio, loja, agenda e formulários
├── js/
│   ├── particles.js         # Canvas de partículas luminosas em fundo espacial/cinematográfico
│   ├── orbital-menu.js      # Matemática e física da rotação 3D dos 13 itens da órbita
│   ├── camera-parallax.js   # Reação 3D da foto da banda ao movimento do mouse/touch
│   ├── audio-player.js      # Player customizado de música com áudio e visualizador
│   └── app.js               # Gerenciador geral de interações, modal, carrinho e scroll
└── assets/
    ├── images/              # Imagens cinematográficas da banda, membros, capas e merch
    └── audio/               # Faixas curtas de demonstração da banda
```

---

## 🧪 Plano de Verificação

### Testes Manuais & Funcionais
1. **Hero 3D & Tilt**: Testar resposta ao movimento do mouse em telas de alta resolução e em telas sensíveis ao toque (touchmove).
2. **Menu Orbital**: Verificar se os 13 itens orbitam corretamente em 360°, mantendo posições de profundidade $Z$ ajustadas e permitindo interatividade ao passar o mouse.
3. **Responsividade**: Testar em telas Mobile ($< 768px$), Tablet ($768px - 1024px$) e Desktop ($> 1200px$), assegurando adaptação fluida da órbita.
4. **Player de Áudio & Vídeo**: Testar reprodução de música, pausa, progresso, volume e abertura dos modais de vídeo.
5. **Formulário & Loja**: Testar interações do carrinho de compras e envio simulado de contato com feedback visual.

---

## 📋 Próximos Passos
Após sua aprovação, criaremos a estrutura completa, os componentes de código HTML/CSS/JS e as imagens exclusivas da banda e produtos.
