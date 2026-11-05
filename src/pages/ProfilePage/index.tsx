import { selectCurrentUser } from '@/entities/user'
import { useAppSelector } from '@/shared/lib'
import { ProfileView } from './ui/ProfileView'
import { useState } from 'react'
import { ProfileForm } from './ui/ProfileForm'

const ProfilePage = () => {
	const [isEditing, setIsEditing] = useState(false)
	const currentUser = useAppSelector(selectCurrentUser)

	const onEdit = () => setIsEditing(true)
	const onFinish = () => setIsEditing(false)

	if (!currentUser) {
		return null
	}

	return (
		<div className='p-8'>
			<div className='max-w-xl mx-auto bg-card border border-border rounded-xl shadow-sm'>
				<div className='bg-card border border-border rounded-xl shadow-sm'>
					{!isEditing ? (
						<ProfileView
							currentUser={currentUser}
							onEdit={onEdit}
						></ProfileView>
					) : (
						<ProfileForm
							currentUser={currentUser}
							onFinish={onFinish}
						></ProfileForm>
					)}
				</div>
			</div>
		</div>
	)
}

export default ProfilePage
