package user

import (
	"context"
	"fmt"
	"task-manager/app/domain/entities/users"

	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

const _getUserPasswordQuery = `
	SELECT
		passwd
	FROM
		users
	WHERE
		public_id = ?
`

func (r *UserRepository) CheckPassword(ctx context.Context, userID uuid.UUID, password string) error {
	const operation = "UserRepository.CheckPassword"

	var passwordStored string
	if err := r.db.QueryRowContext(ctx, _getUserPasswordQuery, userID).Scan(&passwordStored); err != nil {
		return fmt.Errorf("%s: %w", operation, err)
	}

	fmt.Println(password)

	// Compare password with bcrypt
	if err := bcrypt.CompareHashAndPassword([]byte(passwordStored), []byte(password)); err != nil {
		return fmt.Errorf("%s: %w", operation, users.ErrInvalidPassword)
	}

	return nil
}
