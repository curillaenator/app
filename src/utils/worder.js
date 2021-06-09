import { colors } from "./colors";

export const words = {
  logoTitle: (
    <span>
      <span style={{ color: colors.fontTitle }}>IT</span>Profiler
    </span>
  ),
  mainTitle: (
    <span>
      <span style={{ color: colors.primary }}> Найдите лучших </span> <br />
      IT специалистов
    </span>
  ),
  profileTitle: (
    <span>
      Создайте свой{" "}
      <span style={{ color: colors.primary }}>
        <br /> IT профайл
      </span>
    </span>
  ),
  searchBtn: {
    idle: "Искать специалиста",
    active: "Скрыть поиск",
  },
  profileBtn: {
    idle: "Создать профиль",
    active: "Передумал",
  },
  stage2btn: {
    idle: "Добавить опыт работы",
    active: "Передумал",
  },
  searchPh: 'напишите ключевое слово (например "фронтенд")',
  profForm: {
    name: (
      <span>
        Ваше <span style={{ color: colors.fontTitle }}>полное имя</span>:
      </span>
    ),
    namePh: "...к примеру, Батырбек?",
    job: (
      <span>
        Вашу <span style={{ color: colors.fontTitle }}>специализацию</span>:
      </span>
    ),
    jobPh: "...Frontend разработчик, Laravel бэкенд",
    skills: (
      <span>
        Ваши <span style={{ color: colors.fontTitle }}>IT скиллс</span>:
      </span>
    ),
    skillsPh: "...опишите владеемые вами технологии и что на них писали",
    photo: (
      <span>
        Ваше лучшее <span style={{ color: colors.fontTitle }}>фото</span>:
      </span>
    ),
    stepOne: (
      <span>
        Шаг <span style={{ color: colors.fontTitle }}>1</span> - Кто вы?
      </span>
    ),
  },
  stage2form: {
    stepTwo: (
      <span>
        Шаг <span style={{ color: colors.fontTitle }}>2</span> - Ваш опыт
        работы?
      </span>
    ),
    stepTwoAdd: (
      <span>
        Добавьте <span style={{ color: colors.fontTitle }}>место работы</span>
      </span>
    ),
    stepTwoEdit: (
      <span>
        Отредактируйте{" "}
        <span style={{ color: colors.fontTitle }}>место работы</span>
      </span>
    ),
    workStart: (
      <span>
        <span style={{ color: colors.fontTitle }}>Начало</span> работы:
      </span>
    ),
    workEnd: (
      <span>
        <span style={{ color: colors.fontTitle }}>Окончание</span> работы:
      </span>
    ),
    company: (
      <span>
        <span style={{ color: colors.fontTitle }}>Компания</span>, где вы
        работали:
      </span>
    ),
    companyPh: "...например, Google",
    companyActivity: (
      <span>
        Основная <span style={{ color: colors.fontTitle }}>деятельность</span>{" "}
        компании:
      </span>
    ),
    companyActivityPh: "...банковская деятельность, интеренет магазин",
    companySite: (
      <span>
        <span style={{ color: colors.fontTitle }}>Сайт</span> компании:
      </span>
    ),
    companySitePh: "...google.com",
    position: (
      <span>
        Занимаемая вами{" "}
        <span style={{ color: colors.fontTitle }}>должность</span>:
      </span>
    ),
    positionPh: "...Тимлид группы дизайнеров",
    duty: (
      <span>
        Ваши основные{" "}
        <span style={{ color: colors.fontTitle }}>обязанности</span>:
      </span>
    ),
    dutyPh: "...опишите подробно чем занимались",
  },
};
