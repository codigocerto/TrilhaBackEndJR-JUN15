package user

import (
	"context"
	"database/sql"
	"fmt"
	"task-manager/app/domain/entities/users"
)

const _findUserByEmailQuery = `
	SELECT 
		public_id,
		name
	FROM 
		users
	WHERE 
		email = ?
`

func (r *UserRepository) FindByEmail(ctx context.Context, email string) (users.User, error) {
	const operation = "UserRepository.FindByEmail"

	var user users.User
	if err := r.db.QueryRowContext(ctx, _findUserByEmailQuery, email).Scan(&user.PublicID, &user.Name); err != nil {
		if err == sql.ErrNoRows {
			return users.User{}, fmt.Errorf("%s: %w", operation, users.ErrUserNotFound)
		}

		return users.User{}, fmt.Errorf("%s: %w", operation, err)
	}

	return user, nil
}
