package user

import (
	"context"
	"fmt"
	"task-manager/app/domain/entities/users"

	"github.com/google/uuid"
)

const _getUserPasswordQuery = `
	SELECT
		passwd
	FROM
		users
	WHERE
		public_id = ?
`

func (r *UserRepository) GetPassword(ctx context.Context, userID uuid.UUID) (string, error) {
	const operation = "UserRepository.CheckPassword"

	var passwordStored string
	if err := r.db.QueryRowContext(ctx, _getUserPasswordQuery, userID).Scan(&passwordStored); err != nil {
		if err == users.ErrUserNotFound {
			return "", fmt.Errorf("%s: %w", operation, users.ErrUserNotFound)
		}

		return "", fmt.Errorf("%s: %w", operation, err)
	}

	return passwordStored, nil
}
