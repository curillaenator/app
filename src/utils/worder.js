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
  searchPh: 'напишите ключевое слово (например "фронтенд")',
  profForm: {
    name: (
      <span>
        Ваше <span style={{ color: colors.fontTitle }}>полное имя</span>:
      </span>
    ),
    namePh: "...к примеру Батырбек?",
    job: (
      <span>
        Вашу <span style={{ color: colors.fontTitle }}>специализацию</span>:
      </span>
    ),
    jobPh: "...например Frontend разработчик",
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
        Шаг <span style={{ color: colors.fontTitle }}>1</span> - добавьте
      </span>
    ),
  },
};
