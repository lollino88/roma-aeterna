import { useState, useEffect } from "react";

const TAPPE = [
  {
    id: 1, nome: "Cripta dei Cappuccini", indirizzo: "Via Veneto 27, Roma",
    orario: "9:30", lat: 41.9049, lng: 12.4885,
    aneddoto: "L'artista che costruì questo posto non ha mai firmato il suo lavoro. Nessuno sa con certezza chi sia. All'ingresso della cripta c'è scritto: \"Quello che voi siete noi eravamo; quello che noi siamo voi sarete.\" Oltre quella soglia, quasi 4.000 frati sono diventati architettura.",
    enigma: "Cinque stanze, ognuna col nome di ciò che resta. Percorri il corridoio fino in fondo. Sul soffitto dell'ultima cappella, qualcuno che non è mai stato adulto regge qualcosa con entrambe le mani. Cos'è l'oggetto che tiene nella mano sinistra?",
    risposta: "bilancia",
  },
  {
    id: 2, nome: "Casa dei Cavalieri di Rodi", indirizzo: "Piazza del Grillo 1, Roma",
    orario: "10:30", lat: 41.8948, lng: 12.4867,
    aneddoto: "Questo edificio non compare sulle mappe turistiche. È incastrato sopra il Foro di Augusto come se qualcuno avesse costruito casa sua direttamente sul passato. Oggi appartiene all'Ordine di Malta: uno Stato sovrano di 1,2 ettari che esiste da nove secoli.",
    enigma: "Sali alla loggia. Sotto di te, duemila anni di storia giacciono nel fango. Il foro che vedi appartiene a un imperatore che amava i libri più delle battaglie. Qual è il suo nome?",
    risposta: "augusto",
  },
  {
    id: 3, nome: "Pantheon", indirizzo: "Piazza della Rotonda, Roma",
    orario: "11:05", lat: 41.8986, lng: 12.4769,
    aneddoto: "Michelangelo lo definì \"opera di angeli, non di uomini.\" L'imperatore che lo ricostruì era così potente da permettersi il gesto più raro tra i potenti: rinunciare alla firma. Sulla facciata c'è ancora il nome di chi lo costruì la prima volta.",
    enigma: "Entra. Non guardare in su — lo fanno già tutti. Guarda giù. Il pavimento beve la pioggia attraverso buchi quasi invisibili. Ora alza gli occhi: conta gli anelli di cassettoni che salgono verso l'occhio aperto sul cielo. Quanti sono?",
    risposta: "cinque",
  },
  {
    id: 4, nome: "Santa Maria sopra Minerva", indirizzo: "Piazza della Minerva, Roma",
    orario: "11:40", lat: 41.898, lng: 12.4778,
    aneddoto: "È a tre minuti dal Pantheon. Quasi nessuno entra. È l'unica chiesa gotica di Roma — dentro sembra Parigi, non Roma. Il cielo è blu con stelle d'oro. Fuori, Bernini ha messo un elefante che regge un obelisco egizio.",
    enigma: "Prima di entrare, leggi l'iscrizione sul basamento dell'elefante. È in latino. Qual è l'ultima parola che riesci a leggere?",
    risposta: "mente",
  },
  {
    id: 5, nome: "Largo Argentina", indirizzo: "Largo di Torre Argentina, Roma",
    orario: "12:05", lat: 41.896, lng: 12.4769,
    aneddoto: "Non c'è nessuna targa che dica \"qui fu assassinato Giulio Cesare.\" Nessun monumento. Solo rovine e gatti. Eppure il 15 marzo del 44 a.C., in questo preciso punto, finì la Repubblica.",
    enigma: "Trovate le rovine dei quattro templi. Leggete la targa informativa sul sito — c'è una data precisa legata all'assassinio più famoso della storia. Non il giorno del mese, non l'anno. Il numero del giorno delle Idi di Marzo. Scrivetelo in lettere.",
    risposta: "quindici",
  },
  {
    id: 6, nome: "Campo de' Fiori", indirizzo: "Campo de' Fiori, Roma",
    orario: "12:30 — Pausa pranzo", lat: 41.8956, lng: 12.4722,
    aneddoto: "La statua al centro non è un eroe — è un eretico. Giordano Bruno fu bruciato vivo qui il 17 febbraio 1600, condannato per aver detto che l'universo è infinito. Aveva ragione.",
    enigma: "Guarda le mani della statua — non il cappuccio. Cosa stringono? Quell'oggetto nella tradizione di cui Bruno faceva parte si porta sempre sul cuore. Scrivi cosa tiene in mano.",
    risposta: "libro",
  },
  {
    id: 7, nome: "Portico d'Ottavia", indirizzo: "Via del Portico d'Ottavia, Roma",
    orario: "13:30", lat: 41.8925, lng: 12.4785,
    aneddoto: "La presenza degli ebrei a Roma risale al II secolo a.C. — è la comunità più antica d'Europa ancora esistente. Il Portico d'Ottavia fu costruito da Augusto in onore di sua sorella. Per secoli le sue colonne fecero da cornice al mercato del pesce.",
    enigma: "Nel muro di questo portico c'è una lapide che non parla di imperatori. Parla del secolo scorso — il più buio. Trovala e leggi l'anno che riporta. Scrivilo.",
    risposta: "1943",
  },
  {
    id: 8, nome: "Bocca della Verità", indirizzo: "Piazza della Bocca della Verità, Roma",
    orario: "14:00", lat: 41.8882, lng: 12.4814,
    aneddoto: "Tutti fanno la foto con la mano in bocca. Nessuno guarda a destra. A venti metri c'è il tempio rotondo più antico di Roma in marmo greco. Per duemila anni lo chiamarono Tempio di Vesta. Avevano torto: è di Ercole.",
    enigma: "Girati verso il tempio rotondo accanto alla Bocca della Verità. Conta le colonne ancora in piedi — solo quelle intere. Quante sono? Scrivi il numero in lettere.",
    risposta: "diciannove",
  },
  {
    id: 9, nome: "Circo Massimo", indirizzo: "Via del Circo Massimo, Roma",
    orario: "14:35", lat: 41.8859, lng: 12.4858,
    aneddoto: "Duecentocinquantamila persone. Era la capienza del Circo Massimo — più grande di qualsiasi stadio costruito oggi. La pista era lunga 600 metri. Oggi è un prato. L'assenza racconta più di qualsiasi monumento.",
    enigma: "Cammina fino all'estremità orientale — quella con la curva. Fermati e guardati intorno. Alle tue spalle c'è la collina da cui i Cesari guardavano le corse. Come si chiama quella collina?",
    risposta: "palatino",
  },
  {
    id: 10, nome: "Buco della Serratura", indirizzo: "Piazza dei Cavalieri di Malta, Roma",
    orario: "15:05", lat: 41.883, lng: 12.4785,
    aneddoto: "Davanti a te c'è un portone verde. Se metti l'occhio nel buco della serratura attraversi tre Stati senza muoverti: Italia, Ordine di Malta, Vaticano — con la cupola di San Pietro perfettamente centrata in fondo a un viale di cipressi.",
    enigma: "Metti l'occhio nella serratura. Vedi tre stati sovrani in un solo sguardo. Qual è il terzo — quello in fondo al viale, la cui cupola è perfettamente centrata?",
    risposta: "vaticano",
  },
  {
    id: 11, nome: "Sant'Agnese in Agone", indirizzo: "Piazza Navona, Roma",
    orario: "16:00", lat: 41.8988, lng: 12.4726,
    aneddoto: "Piazza Navona non è una piazza medievale — è uno stadio romano. Lo Stadio di Domiziano, costruito nell'85 d.C., ospitava 30.000 spettatori. La forma ovale è esattamente la forma della pista. Sotto la chiesa si vedono ancora le fondamenta delle tribune.",
    enigma: "Entra nella chiesa. Scendi nella cripta. Sotto i marmi barocchi ci sono le pietre originali dello stadio. Il nome dell'imperatore che lo costruì è ovunque. Chi era?",
    risposta: "domiziano",
  },
  {
    id: 12, nome: "Santa Maria dell'Anima", indirizzo: "Via di Santa Maria dell'Anima, Roma",
    orario: "16:35", lat: 41.8998, lng: 12.4722,
    aneddoto: "È a cinquanta metri da Piazza Navona. Quasi sempre vuota. È la chiesa nazionale dei tedeschi a Roma. Dentro c'è la tomba di Adriano VI — l'ultimo papa non italiano prima di Giovanni Paolo II. Regnò un solo anno. Morì odiato da tutti.",
    enigma: "Trova la tomba del papa dimenticato. Conta gli angeli che la custodiscono ai lati. Quanti sono? Scrivi il numero in lettere.",
    risposta: "quattro",
  },
  {
    id: 13, nome: "Castel Sant'Angelo", indirizzo: "Lungotevere Castello 50, Roma",
    orario: "17:15 — Gran Finale", lat: 41.9031, lng: 12.4663,
    aneddoto: "Fu costruito come tomba dall'imperatore Adriano nel 135 d.C. Divenne fortezza, prigione, residenza papale. Il corridoio sopraelevato che lo collega al Vaticano serviva ai Papi per fuggire in caso di rivolta. I Fratres lo sapevano — e lo usavano.",
    enigma: "Cammina sul Ponte degli Angeli. Trova l'angelo che regge la colonna. Poi guarda in cima al castello: l'angelo di bronzo ha la spada in mano. Secondo la leggenda, quando la rimise nel fodero la peste finì. La spada è estratta o rientrata?",
    risposta: "rientrata",
  },
];

function Bussola({ targetLat, targetLng, userLat, userLng }) {
  const [angolo, setAngolo] = useState(null);
  const [bussola, setBussola] = useState(0);
  const [aperta, setAperta] = useState(false);

  useEffect(() => {
    if (!userLat || !userLng) return;
    const dLng = targetLng - userLng;
    const dLat = targetLat - userLat;
    const rad = Math.atan2(dLng, dLat) * (180 / Math.PI);
    setAngolo(rad);
  }, [targetLat, targetLng, userLat, userLng]);

  useEffect(() => {
    const handler = (e) => {
      const alpha = e.webkitCompassHeading ?? e.alpha ?? 0;
      setBussola(alpha);
    };
    const attiva = () => {
      if (typeof DeviceOrientationEvent !== "undefined" &&
        typeof DeviceOrientationEvent.requestPermission === "function") {
        DeviceOrientationEvent.requestPermission()
          .then((r) => {
            if (r === "granted") {
              window.addEventListener("deviceorientation", handler, true);
            }
          });
      } else {
        window.addEventListener("deviceorientation", handler, true);
      }
    };
    attiva();
    return () => {
      window.removeEventListener("deviceorientation", handler, true);
    };
  }, []);

  const rotazione = angolo !== null ? angolo - bussola : 0;

  return (
    <>
      <div onClick={() => setAperta(true)} style={{ cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(139,26,26,0.15)", border: "2px solid #8B1A1A", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 20px rgba(139,26,26,0.3)" }}>
          <div style={{ fontSize: 36, transform: `rotate(${rotazione}deg)`, transition: "transform 0.3s ease", filter: "drop-shadow(0 0 4px #B8860B)" }}>🧭</div>
        </div>
        <span style={{ fontSize: 10, color: "#B8860B", letterSpacing: 1 }}>{userLat ? "SEGUI LA BUSSOLA" : "ATTIVA GPS"}</span>
      </div>
      {aperta && (
        <div onClick={() => setAperta(false)} style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.92)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 1000, cursor: "pointer" }}>
          <div style={{ fontSize: 11, color: "#B8860B", letterSpacing: 3, marginBottom: 32 }}>FRATRES AETERNAE URBIS</div>
          <div style={{ width: 240, height: 240, borderRadius: "50%", background: "rgba(139,26,26,0.1)", border: "2px solid #8B1A1A", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 60px rgba(139,26,26,0.4)" }}>
            <div style={{ fontSize: 140, transform: `rotate(${rotazione}deg)`, transition: "transform 0.3s ease", filter: "drop-shadow(0 0 8px #B8860B)" }}>🧭</div>
          </div>
          <div style={{ fontSize: 11, color: "#555", marginTop: 32, letterSpacing: 2 }}>TOCCA PER CHIUDERE</div>
        </div>
      )}
    </>
  );
}

function SchermataIntro({ onStart }) {
  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0A", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>⚔️</div>
      <h1 style={{ color: "#8B1A1A", fontSize: 32, fontFamily: "Georgia, serif", marginBottom: 8, letterSpacing: 2 }}>ROMA AETERNA</h1>
      <p style={{ color: "#B8860B", fontSize: 13, fontFamily: "Georgia, serif", fontStyle: "italic", marginBottom: 24 }}>I Codici dei Fratres Aeternae Urbis</p>
      <div style={{ background: "#1A1A1A", border: "1px solid #8B1A1A", borderRadius: 8, padding: 20, maxWidth: 340, marginBottom: 32 }}>
        <p style={{ color: "#C0A882", fontSize: 13, lineHeight: 1.7, margin: 0 }}>
          Roma, 1312. Un gruppo di dodici Templari nasconde i propri segreti tra i monumenti della città. Settecento anni dopo, un archivista vaticano viene trovato morto. In tasca: tredici simboli.
          <br /><br />
          <em style={{ color: "#B8860B" }}>"Qui videt, vivit. Qui non videt, dorme."</em>
          <br /><br />
          Hai un giorno. Tredici luoghi. Trova i Fratres prima che loro trovino te.
        </p>
      </div>
      <button onClick={onStart} style={{ background: "#8B1A1A", color: "#F5F0E8", border: "none", borderRadius: 6, padding: "14px 32px", fontSize: 14, fontFamily: "Georgia, serif", letterSpacing: 2, cursor: "pointer", boxShadow: "0 0 20px rgba(139,26,26,0.4)" }}>
        INIZIA L'INDAGINE
      </button>
    </div>
  );
}

function SchermataTappa({ tappa, tappaNum, totTappe, userLat, userLng, onCompleta, onApriMaps }) {
  const [fase, setFase] = useState("aneddoto");
  const [risposta, setRisposta] = useState("");
  const [errore, setErrore] = useState(false);
  const [tentativi, setTentativi] = useState(0);
useEffect(() => {
    setFase("aneddoto");
    setRisposta("");
    setErrore(false);
    setTentativi(0);
  }, [tappa]);
  const distanza = userLat && tappa
    ? Math.round(Math.sqrt(Math.pow((tappa.lat - userLat) * 111000, 2) + Math.pow((tappa.lng - userLng) * 111000 * Math.cos(userLat * Math.PI / 180), 2)))
    : null;
  const vicino = distanza !== null && distanza < 150;

const verificaRisposta = () => {
    const pulita = risposta.trim().toLowerCase();
    if (pulita === tappa.risposta.toLowerCase()) {
      setErrore(false);
      setRisposta("");
      setFase("successo");
    } else {
      setErrore(true);
      setTentativi(t => t + 1);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0A", color: "#F5F0E8", fontFamily: "Georgia, serif" }}>
      <div style={{ background: "#1A1A1A", borderBottom: "1px solid #8B1A1A", padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 10, color: "#B8860B", letterSpacing: 2 }}>TAPPA {tappaNum} / {totTappe}</div>
          <div style={{ fontSize: 15, fontWeight: "bold", color: "#F5F0E8" }}>{tappa.nome}</div>
          <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>{tappa.orario}</div>
        </div>
        <Bussola targetLat={tappa.lat} targetLng={tappa.lng} userLat={userLat} userLng={userLng} />
      </div>

      {distanza !== null && (
        <div style={{ background: vicino ? "rgba(0,100,0,0.2)" : "rgba(139,26,26,0.1)", borderBottom: `1px solid ${vicino ? "#006400" : "#8B1A1A"}`, padding: "8px 16px", textAlign: "center", fontSize: 12, color: vicino ? "#90EE90" : "#B8860B" }}>
          {vicino ? "✅ Sei nel posto giusto" : `📍 Sei a ${distanza}m dalla tappa`}
        </div>
      )}

      <div style={{ padding: 20 }}>
        {fase === "aneddoto" && (
          <>
            <div style={{ background: "#1A1A1A", border: "1px solid #333", borderRadius: 8, padding: 16, marginBottom: 20 }}>
              <div style={{ fontSize: 10, color: "#B8860B", letterSpacing: 2, marginBottom: 10 }}>◆ DOSSIER SEGRETO</div>
              <p style={{ color: "#C0A882", fontSize: 14, lineHeight: 1.8, margin: 0 }}>{tappa.aneddoto}</p>
            </div>
            <button onClick={() => setFase("enigma")} style={{ width: "100%", background: "#8B1A1A", color: "#F5F0E8", border: "none", borderRadius: 6, padding: 14, fontSize: 13, letterSpacing: 1, cursor: "pointer" }}>
              LEGGI IL CODICE DEI FRATRES →
            </button>
          </>
        )}
{fase === "successo" && (
  <>
    <div style={{ background: "#1A1A1A", border: "1px solid #006400", borderRadius: 8, padding: 20, marginBottom: 20, textAlign: "center" }}>
      <div style={{ fontSize: 32, marginBottom: 12 }}>⚔️</div>
      <div style={{ fontSize: 11, color: "#90EE90", letterSpacing: 2, marginBottom: 12 }}>SIGILLO TROVATO</div>
      <p style={{ color: "#C0A882", fontSize: 13, lineHeight: 1.8, margin: 0 }}>
        {tappaNum < totTappe
          ? `Hai decifrato il codice dei Fratres. La prossima tappa ti aspetta: ${TAPPE[tappaNum].nome}.`
          : "Hai completato l'ultima tappa. I Fratres Aeternae Urbis ti hanno visto."}
      </p>
    </div>
    <button onClick={onCompleta} style={{ width: "100%", background: tappaNum < totTappe ? "#8B1A1A" : "#B8860B", color: tappaNum < totTappe ? "#F5F0E8" : "#0A0A0A", border: "none", borderRadius: 6, padding: 14, fontSize: 13, letterSpacing: 1, cursor: "pointer" }}>
      {tappaNum < totTappe ? `PROCEDI VERSO ${TAPPE[tappaNum].nome.toUpperCase()} →` : "⚔️ COMPLETA ROMA AETERNA"}
    </button>
  </>
)}
        {fase === "enigma" && (
          <>
            <div style={{ background: "#1A1A1A", border: "1px solid #8B1A1A", borderRadius: 8, padding: 16, marginBottom: 20 }}>
              <div style={{ fontSize: 10, color: "#8B1A1A", letterSpacing: 2, marginBottom: 10 }}>◆ CODICE DEI FRATRES</div>
              <p style={{ color: "#F5F0E8", fontSize: 14, lineHeight: 1.9, margin: 0 }}>{tappa.enigma}</p>
            </div>

            {/* Campo risposta */}
            <div style={{ background: "#1A1A1A", border: `1px solid ${errore ? "#FF4444" : "#333"}`, borderRadius: 8, padding: 16, marginBottom: 12 }}>
              <div style={{ fontSize: 10, color: errore ? "#FF4444" : "#B8860B", letterSpacing: 2, marginBottom: 10 }}>
                {errore ? `✗ RISPOSTA ERRATA — RIPROVA (tentativo ${tentativi})` : "◆ INSERISCI LA RISPOSTA"}
              </div>
              <input
                value={risposta}
                onChange={(e) => { setRisposta(e.target.value); setErrore(false); }}
                onKeyDown={(e) => e.key === "Enter" && verificaRisposta()}
                placeholder="Scrivi qui la tua risposta..."
                style={{ width: "100%", background: "#0A0A0A", border: "1px solid #333", borderRadius: 4, padding: "10px 12px", color: "#F5F0E8", fontSize: 14, fontFamily: "Georgia, serif", boxSizing: "border-box", outline: "none" }}
              />
            </div>

            <button onClick={verificaRisposta} style={{ width: "100%", background: "#8B1A1A", color: "#F5F0E8", border: "none", borderRadius: 6, padding: 14, fontSize: 13, letterSpacing: 1, cursor: "pointer", marginBottom: 10 }}>
              {tappaNum < totTappe ? "CONFERMA SIGILLO →" : "⚔️ CONFERMA FINALE"}
            </button>

            </>
        )}
      </div>

      <div style={{ padding: "0 20px 20px" }}>
        <div style={{ fontSize: 10, color: "#555", letterSpacing: 2, marginBottom: 8 }}>PROGRESSIONE</div>
        <div style={{ display: "flex", gap: 4 }}>
          {Array.from({ length: totTappe }, (_, i) => (
            <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i < tappaNum ? "#8B1A1A" : i === tappaNum - 1 ? "#B8860B" : "#333" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SchermataFinale() {
  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0A", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
      <div style={{ fontSize: 64, marginBottom: 20 }}>⚔️</div>
      <h1 style={{ color: "#B8860B", fontSize: 28, fontFamily: "Georgia, serif", marginBottom: 12 }}>ROMA AETERNA</h1>
      <p style={{ color: "#8B1A1A", fontSize: 14, fontStyle: "italic", marginBottom: 24 }}>Completato</p>
      <div style={{ background: "#1A1A1A", border: "1px solid #B8860B", borderRadius: 8, padding: 20, maxWidth: 340 }}>
        <p style={{ color: "#C0A882", fontSize: 13, lineHeight: 1.8, margin: 0 }}>
          Hai attraversato duemila anni di Roma. I tredici sigilli dei Fratres Aeternae Urbis sono stati trovati. La società segreta ti ha visto — e ti ha riconosciuto come uno dei suoi.
          <br /><br />
          <em style={{ color: "#B8860B" }}>"Qui videt, vivit."</em>
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const [schermata, setSchermata] = useState("intro");
  const [tappaCorrente, setTappaCorrente] = useState(0);
  const [userLat, setUserLat] = useState(null);
  const [userLng, setUserLng] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) return;
    const watch = navigator.geolocation.watchPosition(
      (pos) => { setUserLat(pos.coords.latitude); setUserLng(pos.coords.longitude); },
      () => {},
      { enableHighAccuracy: true }
    );
    return () => navigator.geolocation.clearWatch(watch);
  }, []);

  const apriMaps = (tappa) => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${tappa.lat},${tappa.lng}&travelmode=walking`, "_blank");
  };

 const completaTappa = () => {
    if (tappaCorrente < TAPPE.length - 1) {
      setTappaCorrente((t) => t + 1);
      setFase("aneddoto");
      setRisposta("");
      setErrore(false);
      setTentativi(0);
      window.scrollTo(0, 0);
    } else {
      setSchermata("finale");
    }
  };

  if (schermata === "intro") return <SchermataIntro onStart={() => setSchermata("gioco")} />;
  if (schermata === "finale") return <SchermataFinale />;

  return (
    <SchermataTappa
      tappa={TAPPE[tappaCorrente]}
      tappaNum={tappaCorrente + 1}
      totTappe={TAPPE.length}
      userLat={userLat}
      userLng={userLng}
      onCompleta={completaTappa}
      onApriMaps={apriMaps}
    />
  );
}