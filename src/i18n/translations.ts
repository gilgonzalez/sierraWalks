export type Locale = 'en' | 'es' | 'de';

export const localeLabel: Record<Locale, string> = {
	en: 'English',
	es: 'Español',
	de: 'Deutsch',
};

export const languageSwitcherLabel: Record<Locale, string> = {
	en: 'Language',
	es: 'Idioma',
	de: 'Sprache',
};

export const blogNavLabel: Record<Locale, string> = {
	en: 'Journal',
	es: 'Blog',
	de: 'Journal',
};

export const itinerariesNavLabel: Record<Locale, string> = {
	en: 'Itineraries',
	es: 'Itinerarios',
	de: 'Reisen',
};

export const itinerariesRouteSlug: Record<Locale, string> = {
	en: 'itineraries',
	es: 'itinerarios',
	de: 'reisen',
};

export const footerRights: Record<Locale, string> = {
	en: 'All rights reserved.',
	es: 'Todos los derechos reservados.',
	de: 'Alle Rechte vorbehalten.',
};

export const homeCopy: Record<
	Locale,
	{
		htmlLang: string;
		metaTitle: string;
		metaDescription: string;
		eyebrow: string;
		heroTitle: string;
		heroLead: string;
		explore: string;
		why: string;
		cards: [string, string, string][];
		sectionTag: string;
		featureTitle: string;
		featureText: string;
		bullets: [string, string, string];
		ctaTitle: string;
		ctaText: string;
		ctaButton: string;
	}
> = {
	en: {
		htmlLang: 'en',
		metaTitle: 'SierraWalks | Walking holidays in Andalucia',
		metaDescription:
			'Guided and self-guided walking holidays in the national parks and protected areas of south-western Andalucia.',
		eyebrow: 'Guided & self-guided walking holidays in south-western Andalucia',
		heroTitle: 'Walking holidays shaped by the sierras of Andalucia.',
		heroLead:
			'SierraWalks specialises in guided and self-guided walking holidays through the national parks and protected areas of south-western Andalucia, shaped by 25 years of local historical and environmental knowledge.',
		explore: 'Explore journeys',
		why: 'Why SierraWalks',
		cards: [
			[
				'Rooted local expertise',
				'Founded by Michael Newcomb, local historian and environmental campaigner with 25 years of experience leading small groups through the wilder parts of the Spanish-speaking world.',
				'',
			],
			[
				'UNESCO biosphere landscapes',
				'These mountains sit within the Mediterranean Intercontinental Biosphere Reserve, where Africa, Eurasia, Atlantic weather and Mediterranean climate meet in one distinctive landscape.',
				'',
			],
			[
				'Nature, migration and deep history',
				'Expect biodiversity hotspots, key bird and whale migration routes, Neanderthal caves, Roman fortresses, Moorish palaces and whitewashed Andalucian pueblos.',
				'',
			],
		],
		sectionTag: 'Serious About the Sierras',
		featureTitle: 'A region where geology, climate and culture collide.',
		featureText:
			'Within the UNESCO Mediterranean Intercontinental Biosphere Reserve, Africa’s movement into Eurasia and the tension between Atlantic and Mediterranean weather systems have created one of the most singular mountain landscapes in southern Europe.',
		bullets: [
			'Protected spaces include Los Alcornocales, Grazalema, Sierra de las Nieves, Sierra Crestillina and Los Reales.',
			'The Straits of Gibraltar form a major migration bottleneck for birds and whales moving between continents.',
			'The same forces that shaped biodiversity also produced a layered cultural landscape of caves, castles, palaces and white villages.',
		],
		ctaTitle: 'Walking holidays for people who want context, not just routes.',
		ctaText:
			'For hikers, naturalists, historians and curious travellers who want to understand the landscapes they walk through, not simply pass through them.',
		ctaButton: 'Start planning your walk',
	},
	es: {
		htmlLang: 'es',
		metaTitle: 'SierraWalks | Vacaciones de senderismo en Andalucía',
		metaDescription:
			'Vacaciones de senderismo guiadas y autoguiadas por paisajes de montaña protegidos del suroeste andaluz.',
		eyebrow: 'Viajes guiados y autoguiados de senderismo en Andalucía',
		heroTitle: 'Camina por las sierras más salvajes del sur de España.',
		heroLead:
			'SierraWalks diseña viajes de senderismo a pequeña escala en paisajes protegidos donde convergen biodiversidad, historia local y relieve espectacular.',
		explore: 'Explorar rutas',
		why: 'Por qué SierraWalks',
		cards: [
			[
				'Espacios protegidos',
				'Descubre Los Alcornocales, Grazalema, Sierra de las Nieves y otras sierras destacadas del suroeste andaluz.',
				'',
			],
			[
				'Experiencia local',
				'Inspirado por 25 años de guiado local, activismo ambiental y conocimiento profundo del mundo hispanohablante.',
				'',
			],
			[
				'Naturaleza y cultura',
				'Camina por una región de rutas migratorias, alta biodiversidad, cuevas neandertales, castillos romanos y pueblos blancos.',
				'',
			],
		],
		sectionTag: 'Compromiso con las sierras',
		featureTitle: 'Una biosfera donde se encuentran mundos distintos.',
		featureText:
			'En plena Reserva de la Biosfera Intercontinental del Mediterráneo (UNESCO), estas montañas se forman por el encuentro entre África y Eurasia, y por la influencia atlántica y mediterránea.',
		bullets: [
			'Salidas guiadas para quienes buscan contexto local y planificación integral.',
			'Rutas autoguiadas para viajeros independientes con diseño experto.',
			'Viajes centrados en vida silvestre, naturaleza protegida y pueblos auténticos.',
		],
		ctaTitle: 'Senderismo con profundidad, no solo kilómetros.',
		ctaText:
			'Para senderistas, naturalistas, historiadores y viajeros curiosos que quieren conocer Andalucía de forma más auténtica.',
		ctaButton: 'Empieza a planificar tu ruta',
	},
	de: {
		htmlLang: 'de',
		metaTitle: 'SierraWalks | Wanderreisen in Andalusien',
		metaDescription:
			'Geführte und selbstgeführte Wanderreisen durch geschützte Berglandschaften im Südwesten Andalusiens.',
		eyebrow: 'Geführte und selbstgeführte Wanderreisen in Andalusien',
		heroTitle: 'Entdecke die wilden Sierras Südspaniens zu Fuß.',
		heroLead:
			'SierraWalks gestaltet kleine Wanderreisen durch geschützte Berglandschaften, in denen Biodiversität, lokale Geschichte und dramatisches Terrain zusammenkommen.',
		explore: 'Touren entdecken',
		why: 'Warum SierraWalks',
		cards: [
			[
				'Geschützte Landschaften',
				'Entdecke Los Alcornocales, Grazalema, Sierra de las Nieves und weitere besondere Gebirge im Südwesten Andalusiens.',
				'',
			],
			[
				'Lokale Expertise',
				'Inspiriert von 25 Jahren lokaler Führung, Umweltengagement und fundierter Kenntnis der spanischsprachigen Welt.',
				'',
			],
			[
				'Natur und Kultur',
				'Wandere durch eine Region mit Vogelzugrouten, Biodiversitäts-Hotspots, Neandertalerhöhlen, römischen Burgen und weißen Dörfern.',
				'',
			],
		],
		sectionTag: 'Ernsthaft über die Sierras',
		featureTitle: 'Eine Biosphäre, in der Welten aufeinandertreffen.',
		featureText:
			'Diese Berge liegen im UNESCO-Biosphärenreservat „Mediterranean Intercontinental“ und werden durch das Zusammentreffen von Afrika und Eurasien sowie atlantischem und mediterranem Klima geprägt.',
		bullets: [
			'Geführte Reisen für Gäste, die lokale Einblicke und reibungslose Planung wünschen.',
			'Selbstgeführte Routen für unabhängige Wanderer mit lokalem Expertenkonzept.',
			'Reisen mit Fokus auf Tierwelt, Schutzgebiete und authentisches Dorfleben.',
		],
		ctaTitle: 'Wanderreisen mit Tiefe statt nur Distanz.',
		ctaText:
			'Für Wanderer, Naturfreunde, Geschichtsinteressierte und neugierige Reisende mit Anspruch auf echte Andalusien-Erlebnisse.',
		ctaButton: 'Wanderreise planen',
	},
};