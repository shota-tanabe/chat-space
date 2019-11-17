class CreateGroupUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :group_users do |t|
      t.references :group, forrein_key: true
      t.references :user, forrein_key: true
      t.timestamps
    end
  end
end