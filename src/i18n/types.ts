import pt from './locales/pt'

export type Locale = 'pt' | 'en' | 'es'

export type LocaleMessages = {
  nav: {
    home: string
    about: string
    contact: string
    openMenu: string
    closeMenu: string
    userArea: string
    langPt: string
    langEn: string
    langEs: string
    selectLanguage: string
  }

  home: {
    badge: string
    titleLine1: string
    titleEm: string
    titleLine2: string
    sub: string
    ctaPrimary: string
    ctaGhost: string
    metricUptime: string
    metricLoad: string
    metricProjects: string
    metricSupport: string
    partnersLabel: string
    featuresEyebrow: string
    featuresTitleLine1: string
    featuresTitleEm: string
    featuresSub: string
    diffPerfTitle: string
    diffPerfDesc: string
    diffSecTitle: string
    diffSecDesc: string
    diffDeployTitle: string
    diffDeployDesc: string
    diffDataTitle: string
    diffDataDesc: string
    ctaEyebrow: string
    ctaTitleLine1: string
    ctaTitleEm: string
    ctaSub: string
    ctaButton: string
  }

  sobre: {
    heroBadge: string
    heroTitle1: string
    heroEm1: string
    heroTitle2: string
    heroEm2: string
    heroSub: string
    ctaStart: string
    ctaServices: string
    codeComment: string
    codeFoco: string
    codeEsp1: string
    codeEsp2: string
    codeEsp3: string
    codeEsp4: string
    codeStack: string
    codeEntrega: string
    aboutLabel: string
    aboutTitle1: string
    aboutTitleEm: string
    aboutP1: string
    aboutP2: string
    check1: string
    check2: string
    check3: string
    check4: string

    servicesLabel: string
    servicesTitleLine1: string
    servicesTitleEm: string

    techLabel: string
    techTitleLine1: string
    techTitleEm: string

    teamLabel: string
    teamTitleLine1: string
    teamTitleEm: string

    ctaEyebrow: string
    ctaTitle1: string
    ctaTitleEm: string
    ctaSub: string
    ctaButton: string

    servico1t: string
    servico1d: string
    servico2t: string
    servico2d: string
    servico3t: string
    servico3d: string
    servico4t: string
    servico4d: string

    tagRefactor: string
    tagCicd: string
    tagTests: string
    tagSeo: string
    tagPerf: string
    tagResp: string
    tagArch: string
    tagReview: string
    tagStack: string

    statProjects: string
    statYears: string
    statClients: string
    statResponse: string

    timeline1: string
    timeline2: string
    timeline3: string
    timeline4: string
    timeline5: string

    member1role: string
    member1bio: string
    member2role: string
    member2bio: string
    member3role: string
    member3bio: string
  }

  contato: {
    whatsappMsg: string
    eyebrow: string
    title1: string
    titleEm: string
    lead: string
    leadStrong: string
    leadEnd: string
    waBtn: string
    mailBtn: string
    sideTitle: string
    waLabel: string
    waHint: string
    emailLabel: string
    emailHint: string
    phoneLabel: string
    phoneHint: string
    locLabel: string
    hoursTitle: string
    hoursWeekdays: string
    hoursSat: string
    hoursSun: string
    hoursHol: string
    closed: string
    onlineNow: string
    formTitle: string
    formSub: string
    labelName: string
    req: string
    phName: string
    labelEmail: string
    phEmail: string
    labelCompany: string
    optional: string
    phCompany: string
    labelSubject: string
    selectPlaceholder: string
    labelMessage: string
    phMessage: string
    chars: string
    privacy: string
    sending: string
    submit: string
    successTitle: string
    successSub: string
    fabLabel: string
    fabTitle: string
    fabShort: string
    assunto1: string
    assunto2: string
    assunto3: string
    assunto4: string
    assunto5: string
    errName: string
    errEmail: string
    errEmailInvalid: string
    errSubject: string
    errMessage: string
    errConfig: string
    errSendPrefix: string
    errSendGeneric: string
    emailSubjectPrefix: string
    emailCompanyPrefix: string
  }
}
