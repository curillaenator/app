import { useState } from "react";
import styled from "styled-components";

import { ButtonGhost } from "../buttons/ButtonGhost";
import { Dropdown } from "../controls/Dropdown";
import { FormProfileTwo } from "../formprofile/FormProfileTwo";

import { periodCalc, sortJobExp } from "../../../utils/helpers";

import { colors } from "../../../utils/colors";
import { icons } from "../../../utils/icons";

const JobStyled = styled.div`
  display: ${({ hide }) => (hide ? "none" : "block")};
  margin-bottom: 32px;
  padding: 24px;
  border-radius: 16px;
  background-color: ${colors.bgWhite};

  .job__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;

    &_title {
      font-size: 18px;
      font-weight: 900;
      color: ${colors.primary};
    }

    &_edit {
      display: flex;
      align-items: center;
    }
  }

  .job_description {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .left {
      width: 100%;
    }

    .right {
      width: 100%;
    }

    .block {
      &_string {
        margin-bottom: 24px;

        &-title {
          margin-bottom: 12px;
          font-size: 14px;
          font-weight: 600;
          color: ${colors.fontTitle};
        }

        &-data {
          font-size: 16px;
          font-weight: 600;
        }

        &-databold {
          font-size: 16px;
          font-weight: 800;
        }

        &-url {
          width: fit-content;
          font-size: 16px;
          font-weight: 800;
          color: ${colors.fontLink};
          cursor: pointer;
          transition: 0.08s linear;

          &:hover {
            color: ${colors.primaryHover2};
          }

          &:active {
            color: ${colors.fontLink};
          }
        }
      }
    }
  }

  @media (min-width: 768px) {
    .job_description {
      flex-direction: row;

      .left {
        width: 30%;
      }

      .right {
        width: calc(70% - 64px);
      }
    }
  }
`;

const BlockTwoStyled = styled.div`
  margin-bottom: 56px;

  .blockTwo_label {
    margin-bottom: 32px;
    padding: 0 24px;
    font-size: 24px;
    font-weight: 800;
    color: ${colors.fontTitle};
    user-select: none;
  }

  .job_container {
  }

  .buttons {
  }
`;

export const ProfileBlockTwo = ({
  isOwner,
  isMobile,
  profile,
  addJobExperience,
  updateJobExperience,
  removeJobExperience,
}) => {
  const [addForm, setAddForm] = useState(false);
  const [editForm, setEditForm] = useState(null);

  const deleteJobDropdownItems = [
    {
      title: "Да",
      icon: icons.delete,
      handler: (jobID) => removeJobExperience(jobID),
      danger: true,
    },
    { title: "Отмена", icon: icons.back, handler: () => {} },
  ];

  return (
    <BlockTwoStyled>
      <div className="blockTwo_label">Опыт работы:</div>

      {sortJobExp(profile.jobExp).map((job) => (
        <div className="job_container" key={job.jobID}>
          {editForm === job.jobID && (
            <FormProfileTwo
              edit
              editID={job.jobID}
              initValues={job}
              setForm={() => setEditForm(null)}
              updateJobExperience={updateJobExperience}
            />
          )}

          <JobStyled hide={editForm === job.jobID}>
            <div className="job__header">
              <h2 className="job__header_title">{job.company}</h2>

              {isOwner && (
                <div className="job__header_edit">
                  <ButtonGhost
                    title={isMobile ? "" : "Редактировать"}
                    icon={icons.edit}
                    iconsize={isMobile ? 26 : 18}
                    handler={() => setEditForm(job.jobID)}
                  />
                  <Dropdown
                    delID={job.jobID}
                    title={isMobile ? "" : "Удалить"}
                    icon={icons.delete}
                    iconsize={isMobile ? 26 : 18}
                    items={deleteJobDropdownItems}
                    danger
                  />
                </div>
              )}
            </div>

            <div className="job_description">
              <div className="block left">
                <div className="block_string">
                  <h4 className="block_string-title">Сайт компании:</h4>
                  <div
                    className="block_string-url"
                    onClick={() => window.open(job.companySite, "_blank")}
                  >
                    {job.companySite}
                  </div>
                </div>

                <div className="block_string">
                  <h4 className="block_string-title">Деятельность компании:</h4>
                  <div className="block_string-data">{job.companyActivity}</div>
                </div>
              </div>

              <div className="block right">
                <div className="block_string">
                  <h4 className="block_string-title">Должность:</h4>
                  <div className="block_string-databold">{job.position}</div>
                </div>

                <div className="block_string">
                  <h4 className="block_string-title">Период:</h4>
                  <div className="block_string-data">
                    {periodCalc(job.startDate, job.endDate)}
                  </div>
                </div>

                <div className="block_string">
                  <h4 className="block_string-title">Обязанности:</h4>
                  <div className="block_string-data">{job.duty}</div>
                </div>
              </div>
            </div>
          </JobStyled>
        </div>
      ))}

      {isOwner && !addForm && (
        <div className="buttons">
          <ButtonGhost
            title="Добавить место работы"
            icon={icons.more}
            handler={() => setAddForm(true)}
          />
        </div>
      )}

      {isOwner && addForm && (
        <FormProfileTwo
          add
          setForm={() => setAddForm(false)}
          addJobExperience={addJobExperience}
        />
      )}
    </BlockTwoStyled>
  );
};
