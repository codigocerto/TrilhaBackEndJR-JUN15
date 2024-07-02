package auth

import (
	"context"

	"github.com/dgrijalva/jwt-go"
	"github.com/golang-jwt/jwt"
	"github.com/google/uuid"
)

type InputToken struct {
	PublicID uuid.UUID
	Name     string
	Email    string
}

func GenerateToken(ctx context.Context, input InputToken) (string, error) {
	claims := jwt.Claims{
		"public_id": input.PublicID,
		"name":      input.Name,
		"email":     input.Email,
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := token.SignedString([]byte("secret"))
	if err != nil {
		return "", err
	}

	return tokenString, nil
}
