import React from "react";
import s from './ProfileInfo.module.css'
import {ProfileType} from '../../../redux/profile-reducer';

type ProfileInfoPropsType = {
    profile:ProfileType
}

function ProfileInfo(props:ProfileInfoPropsType) {
    return (
        <div>
            <div>
                <img
                    src="https://image.shutterstock.com/image-photo/aerial-view-nemiga-minsk-belarus-260nw-1282455937.jpg"
                    alt=""/>
            </div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large}/>
                ava + description
            </div>

        </div>
    )
}

export default ProfileInfo

