package user

import (
	"context"
	"fmt"
	"task-manager/app/domain/entities/users"

	"github.com/google/uuid"
)

const _checkUserExistsQuery = `
	SELECT
		COUNT(*)
	FROM
		users
	WHERE
		email = ?
`

const _createUserQuery = `
	INSERT INTO 
		users (public_id, name, email, passwd)
	VALUES 
		(?, ?, ?, ?)
`

func (r *UserRepository) CreateUser(ctx context.Context, user users.User) error {
	const operation = "UserRepository.CreateUser"

	// Check if user exists
	var count int
	if err := r.db.QueryRowContext(ctx, _checkUserExistsQuery, user.Email).Scan(&count); err != nil {
		return fmt.Errorf("%s: %w", operation, err)
	}

	if count > 0 {
		return fmt.Errorf("%s: %w", operation, users.ErrUserAlreadyExists)
	}

	// Generate user public ID
	user.Public = uuid.New()

	_, err := r.db.ExecContext(
		ctx,
		_createUserQuery,
		user.Public,
		user.Name,
		user.Email,
		user.Password,
	)
	if err != nil {
		return fmt.Errorf("%s: %w", operation, err)
	}

	return nil
}
